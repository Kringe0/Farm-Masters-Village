"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Loader2, 
  Save, 
  Plus, 
  Trash2, 
  Home, 
  Calculator, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Edit3,
  X,
  Tag,
  DollarSign,
  BedDouble,
  Bath
} from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { publicAssetUrl } from '@/lib/utils';

interface Amortization {
  years: number;
  amount: string;
}

interface Property {
  id?: number;
  title: string;
  tag: string;
  property_type: string;
  location: string;
  price: string;
  lot_area: string;
  floor_area: string;
  beds: number;
  baths: number;
  carpark?: string;
  description: string;
  image_url: string;
  interior_images: string[];
  loanable_amount: string;
  downpayment: string;
  transfer_equity: string;
  amortization: Amortization[];
}

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      showError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    const newProp: Property = {
      title: "New Property Listing",
      tag: "Available",
      property_type: "House & Lot",
      location: "Pulong Bayabas, San Miguel, Bulacan",
      price: "₱0.00",
      lot_area: "0 sqm",
      floor_area: "0 sqm",
      beds: 0,
      baths: 0,
      carpark: "",
      description: "Enter property description here...",
      image_url: "/house1-int1.jpg",
      interior_images: [],
      loanable_amount: "₱0.00",
      downpayment: "₱0.00",
      transfer_equity: "₱0.00",
      amortization: [
        { years: 5, amount: "₱0.00" },
        { years: 10, amount: "₱0.00" },
        { years: 15, amount: "₱0.00" },
        { years: 20, amount: "₱0.00" },
        { years: 25, amount: "₱0.00" },
        { years: 30, amount: "₱0.00" }
      ]
    };
    setProperties([newProp, ...properties]);
    setEditingIndex(0);
  };

  const handleUpdate = async (index: number) => {
    const property = properties[index];
    setSaving(index);
    
    try {
      const { id, ...propertyData } = property;
      const payload = id ? property : propertyData;

      const { data, error } = await supabase
        .from('properties')
        .upsert(payload)
        .select();

      if (error) throw error;
      
      if (data && data[0]) {
        const newProperties = [...properties];
        newProperties[index] = data[0];
        setProperties(newProperties);
      }
      
      showSuccess(`${property.title} saved successfully!`);
      setEditingIndex(null);
    } catch (error: any) {
      console.error('Error updating property:', error);
      showError("Failed to save changes: " + (error.message || "Unknown error"));
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (index: number) => {
    const property = properties[index];
    if (!property.id) {
      setProperties(properties.filter((_, i) => i !== index));
      setEditingIndex(null);
      return;
    }

    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', property.id);

      if (error) throw error;
      setProperties(properties.filter((_, i) => i !== index));
      setEditingIndex(null);
      showSuccess("Property deleted.");
    } catch (error) {
      showError("Failed to delete property.");
    }
  };

  const handleChange = (index: number, field: keyof Property, value: any) => {
    const newProperties = [...properties];
    newProperties[index] = { ...newProperties[index], [field]: value };
    setProperties(newProperties);
  };

  const handleAmortizationChange = (propIndex: number, amortIndex: number, value: string) => {
    const newProperties = [...properties];
    const newAmort = [...newProperties[propIndex].amortization];
    newAmort[amortIndex] = { ...newAmort[amortIndex], amount: value };
    newProperties[propIndex] = { ...newProperties[propIndex], amortization: newAmort };
    setProperties(newProperties);
  };

  const toggleEdit = (index: number) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <Navbar />
      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-[-0.04em]">Inventory</h1>
            <p className="text-stone-600">Manage property listings and financial schedules.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              onClick={fetchProperties}
              variant="outline"
              disabled={loading}
              className="rounded-xl border-emerald-100 text-emerald-700 bg-white flex-1 md:flex-none"
            >
              <RefreshCw size={18} className={cn("mr-2", loading && "animate-spin")} />
              Refresh
            </Button>
            <Button 
              onClick={handleAddNew}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-200 flex-1 md:flex-none"
            >
              <Plus size={18} className="mr-2" />
              Add Property
            </Button>
          </div>
        </div>

        {loading && properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-emerald-600">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-black text-xs uppercase tracking-widest animate-pulse">Loading Inventory...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-emerald-200 shadow-sm">
            <Home size={48} className="mx-auto text-emerald-100 mb-4" />
            <h3 className="text-xl font-bold text-emerald-950">No properties found</h3>
            <p className="text-emerald-800/40 mt-2 mb-8 font-medium">Start by adding your first property listing.</p>
            <Button onClick={handleAddNew} className="bg-emerald-600 rounded-xl px-8">Add Property</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((prop, idx) => {
              const isEditing = editingIndex === idx;
              
              return (
                <Card 
                  key={prop.id || `new-${idx}`} 
                  className={cn(
                    "rounded-[2rem] border-emerald-100 transition-all duration-300 overflow-hidden",
                    isEditing ? "shadow-2xl ring-2 ring-emerald-500/20" : "shadow-sm hover:shadow-md"
                  )}
                >
                  <div 
                    className={cn(
                      "p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer transition-colors",
                      isEditing ? "bg-emerald-50/50 border-b border-emerald-100" : "bg-white hover:bg-emerald-50/30"
                    )}
                    onClick={() => toggleEdit(idx)}
                  >
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-emerald-100 flex-shrink-0 border border-emerald-100">
                        <img src={publicAssetUrl(prop.image_url)} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-black text-emerald-950 tracking-tight leading-tight">{prop.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            <DollarSign size={10} />
                            {prop.price}
                          </div>
                          <span className="text-emerald-200">•</span>
                          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-800/40 uppercase tracking-widest">
                            <Tag size={10} />
                            {prop.tag}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <Button 
                        variant="ghost" 
                        className="text-emerald-600 font-bold text-sm hover:bg-emerald-100/50 rounded-xl flex-1 md:flex-none"
                      >
                        {isEditing ? (
                          <>
                            <X size={18} className="mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit3 size={18} className="mr-2" />
                            Edit Details
                          </>
                        )}
                      </Button>
                      <div className="text-emerald-300 hidden md:block">
                        {isEditing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <CardContent className="p-6 md:p-10 bg-white animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
                        <div className="space-y-8">
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                              General Information
                            </h4>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Property Title</label>
                                <Input 
                                  value={prop.title} 
                                  onChange={(e) => handleChange(idx, 'title', e.target.value)}
                                  className="rounded-xl border-emerald-100 h-12 focus-visible:ring-emerald-500"
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Price</label>
                                  <Input value={prop.price} onChange={(e) => handleChange(idx, 'price', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Status Tag</label>
                                  <Input value={prop.tag} onChange={(e) => handleChange(idx, 'tag', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Main Image URL</label>
                                <Input value={prop.image_url} onChange={(e) => handleChange(idx, 'image_url', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Interior Gallery (Comma separated)</label>
                                <Textarea 
                                  value={prop.interior_images?.join(', ') || ''} 
                                  onChange={(e) => handleChange(idx, 'interior_images', e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))} 
                                  placeholder="/house1-int1.jpg, /house1-int2.jpg"
                                  className="rounded-xl border-emerald-100 min-h-[80px] p-4" 
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Description</label>
                                <Textarea 
                                  value={prop.description} 
                                  onChange={(e) => handleChange(idx, 'description', e.target.value)} 
                                  className="rounded-xl border-emerald-100 min-h-[120px] p-4" 
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1 flex items-center gap-1">
                                    <BedDouble size={10} /> Bedrooms
                                  </label>
                                  <Input 
                                    type="number"
                                    value={prop.beds} 
                                    onChange={(e) => handleChange(idx, 'beds', parseInt(e.target.value) || 0)} 
                                    className="rounded-xl border-emerald-100 h-12" 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1 flex items-center gap-1">
                                    <Bath size={10} /> Bathrooms
                                  </label>
                                  <Input 
                                    type="number"
                                    value={prop.baths} 
                                    onChange={(e) => handleChange(idx, 'baths', parseInt(e.target.value) || 0)} 
                                    className="rounded-xl border-emerald-100 h-12" 
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Lot Area</label>
                                  <Input value={prop.lot_area} onChange={(e) => handleChange(idx, 'lot_area', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Floor Area</label>
                                  <Input value={prop.floor_area} onChange={(e) => handleChange(idx, 'floor_area', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Carpark</label>
                                  <Input value={prop.carpark || ''} onChange={(e) => handleChange(idx, 'carpark', e.target.value)} placeholder="e.g. 1 Carpark" className="rounded-xl border-emerald-100 h-12" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                              <Calculator size={16} />
                              Financing Details
                            </h4>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Loanable Amount</label>
                                  <Input value={prop.loanable_amount} onChange={(e) => handleChange(idx, 'loanable_amount', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold uppercase text-emerald-900/40 ml-1">Downpayment</label>
                                  <Input value={prop.downpayment} onChange={(e) => handleChange(idx, 'downpayment', e.target.value)} className="rounded-xl border-emerald-100 h-12" />
                                </div>
                              </div>

                              <div className="bg-emerald-50/50 p-6 md:p-8 rounded-[1.5rem] border border-emerald-100">
                                <label className="text-[10px] font-black uppercase text-emerald-900/40 block mb-6 tracking-widest">Monthly Amortization Schedule</label>
                                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                                  {prop.amortization.map((amort, aIdx) => (
                                    <div key={aIdx} className="space-y-1.5">
                                      <label className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">{amort.years} Years</label>
                                      <Input 
                                        value={amort.amount} 
                                        onChange={(e) => handleAmortizationChange(idx, aIdx, e.target.value)} 
                                        className="rounded-xl border-emerald-100 bg-white h-11 text-sm font-bold"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="pt-8 border-t border-emerald-50 flex flex-col sm:flex-row gap-3">
                            <Button 
                              onClick={() => handleUpdate(idx)} 
                              disabled={saving === idx}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-14 flex-grow font-bold text-base shadow-lg shadow-emerald-200"
                            >
                              {saving === idx ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
                              Save Property Changes
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleDelete(idx)}
                              className="rounded-xl h-14 px-6 font-bold"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProperties;