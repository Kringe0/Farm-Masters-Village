import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const RESEND_AUDIENCE_ID = Deno.env.get('RESEND_AUDIENCE_ID')

    console.log("[notify-admin] Function triggered for inquiry:", record?.id)

    if (!RESEND_API_KEY) {
      console.error("[notify-admin] ERROR: RESEND_API_KEY is not found in secrets.")
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // 1. Send Notification Email to Admin
    console.log("[notify-admin] Sending notification email to admin...")
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Farm Masters Village <inquiries@farmmastersvillage.com.ph>',
        to: ['analizacatacutan24@gmail.com'], 
        subject: `🏠 New Property Inquiry: ${record.name} - ${record.interest}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Property Inquiry</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding: 40px 0 20px 0;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                      <td align="center" style="background-color: #064e3b; padding: 60px 40px 40px 40px;">
                        <!-- Logo Container for High Visibility -->
                        <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                          <tr>
                            <td align="center" style="background-color: #ffffff; padding: 20px; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                              <img src="https://farmmastersvillage.com.ph/logo.png" alt="Farm Masters Village III" width="120" style="display: block; border: 0;">
                            </td>
                          </tr>
                        </table>
                        
                        <div style="color: #10b981; font-size: 13px; font-weight: 900; text-transform: uppercase; letter-spacing: 4px; margin-bottom: 12px;">Farm Masters Village III</div>
                        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1.5px; line-height: 1;">New Property Inquiry</h1>
                      </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                      <td style="padding: 50px 40px;">
                        <p style="margin: 0 0 30px 0; font-size: 17px; color: #475569; line-height: 1.6;">
                          Hello Analiza, you have received a new property inquiry from your website. Here are the details:
                        </p>
                        
                        <!-- Lead Card -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 20px; border: 1px solid #e2e8f0;">
                          <tr>
                            <td style="padding: 30px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td style="font-size: 11px; font-weight: 900; color: #059669; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px;">Client Name</td>
                                </tr>
                                <tr>
                                  <td style="font-size: 20px; font-weight: 800; color: #0f172a; padding-bottom: 25px;">${record.name}</td>
                                </tr>
                                
                                <tr>
                                  <td style="font-size: 11px; font-weight: 900; color: #059669; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px;">Interested In</td>
                                </tr>
                                <tr>
                                  <td style="font-size: 16px; font-weight: 700; color: #0f172a; padding-bottom: 25px;">
                                    <span style="background-color: #d1fae5; color: #065f46; padding: 6px 14px; border-radius: 10px; font-size: 14px; border: 1px solid #a7f3d0;">${record.interest}</span>
                                  </td>
                                </tr>

                                <tr>
                                  <td style="padding-top: 15px; border-top: 1px solid #e2e8f0;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td width="50%" style="padding-top: 20px;">
                                          <div style="font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px;">Phone Number</div>
                                          <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${record.phone}</div>
                                        </td>
                                        <td width="50%" style="padding-top: 20px;">
                                          <div style="font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px;">Email Address</div>
                                          <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${record.email}</div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Message Section -->
                        <div style="margin-top: 40px;">
                          <div style="font-size: 11px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 10px;">Client Message</div>
                          <div style="font-size: 16px; color: #334155; line-height: 1.7; font-style: italic; background-color: #ffffff; border-left: 5px solid #10b981; padding: 20px 25px; border-radius: 0 12px 12px 0; background-color: #f0fdf4;">
                            "${record.message}"
                          </div>
                        </div>

                        <!-- CTA Button -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 50px;">
                          <tr>
                            <td align="center">
                              <a href="https://farmmastersvillage.com.ph/admin/inquiries" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 20px 40px; text-decoration: none; border-radius: 16px; font-weight: 800; font-size: 16px; box-shadow: 0 12px 24px rgba(5, 150, 105, 0.25); text-transform: uppercase; letter-spacing: 1px;">
                                Open Admin Dashboard
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">
                          &copy; ${new Date().getFullYear()} Farm Masters Village III • Automated Notification
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      }),
    })

    if (!emailRes.ok) {
      const emailError = await emailRes.json()
      console.error("[notify-admin] Email failed to send:", emailError)
    } else {
      console.log("[notify-admin] Admin notification email sent successfully.")
    }

    // 2. Add Contact to Resend Audience
    if (RESEND_AUDIENCE_ID) {
      console.log("[notify-admin] Adding contact to audience ID:", RESEND_AUDIENCE_ID)
      
      const nameParts = record.name.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

      const contactRes = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          email: record.email,
          first_name: firstName,
          last_name: lastName,
          unsubscribed: false,
        }),
      })

      if (!contactRes.ok) {
        const contactError = await contactRes.json()
        console.error("[notify-admin] Failed to add contact to Resend audience:", contactError)
      } else {
        console.log("[notify-admin] Contact added to Resend audience successfully.")
      }
    }

    return new Response(
      JSON.stringify({ message: "Notification processed" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error("[notify-admin] Unexpected Error:", error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})