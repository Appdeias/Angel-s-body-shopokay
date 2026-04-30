import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const body = await req.json();
    const { section, slot } = body;

    if (!section || !slot) {
      return new Response(JSON.stringify({ error: 'Missing section or slot' }), {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }

    // Get current media record to find storage path
    const { data: existing } = await supabaseAdmin
      .from('site_media')
      .select('url')
      .eq('section', section)
      .eq('slot', slot)
      .maybeSingle();

    if (existing?.url) {
      // Extract path from public URL
      const url = new URL(existing.url);
      const pathMatch = url.pathname.match(/\/site-media\/(.+)/);
      if (pathMatch) {
        const storagePath = pathMatch[1];
        await supabaseAdmin.storage.from('site-media').remove([`site-media/${storagePath}`]);
      }
    }

    // Delete from DB
    const { error: dbError } = await supabaseAdmin
      .from('site_media')
      .delete()
      .eq('section', section)
      .eq('slot', slot);

    if (dbError) {
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }
});