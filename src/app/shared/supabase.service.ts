import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { environment } from '@/environments/environment'; // For production settings

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://vnlxtdubmdocbcboaydz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZubHh0ZHVibWRvY2JjYm9heWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODQ1ODIsImV4cCI6MjA2ODA2MDU4Mn0.CjFadQz7WWiCAbY5xyWLJ4iboky8iB9WfuLlBZs_Dlg'
      // environment.supabaseUrl,
      // environment.supabaseKey
    );
  }



}