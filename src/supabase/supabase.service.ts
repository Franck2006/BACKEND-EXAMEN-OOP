import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    public client: SupabaseClient;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
        }

        this.client = createClient(supabaseUrl, supabaseKey);
    }
}
