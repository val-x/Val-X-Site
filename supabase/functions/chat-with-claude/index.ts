import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Anthropic } from 'npm:@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY')
})


serve(async (req) => {
  try {
    const { message } = await req.json()

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: message }]
    })

    return new Response(
      JSON.stringify({ response: response.content[0].text }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Configure this to your domain in production
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // Configure this to your domain in production
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
      },
    )
  }
})