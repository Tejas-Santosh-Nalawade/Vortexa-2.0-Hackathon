import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
let supabase;

if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
  console.log('✅ Supabase client initialized');
} else {
  console.warn('⚠️ Supabase environment variables missing');
}

// Journal Service Class
class JournalService {
  // Check if Supabase is configured
  static isConfigured() {
    return !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && supabase);
  }

  // Store journal entry
  static async storeJournalEntry(userId, journalData) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { text, emotions, summary, insights, analysis } = journalData;
      
      const primaryFeeling = emotions[0]?.label || 'unknown';
      const confidence = analysis?.confidence || 0;
      
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0];

      const { data, error } = await supabase
        .from('journals')
        .insert([
          {
            user_id: userId,
            date: currentDate,
            time: currentTime,
            feeling: primaryFeeling,
            text: text,
            emotions: emotions,
            confidence_score: confidence,
            summary: summary,
            insights: insights,
            created_at: now.toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      console.log("✅ Journal entry stored successfully");
      return data;
      
    } catch (error) {
      console.error("❌ Error storing journal entry:", error.message);
      throw error;
    }
  }

  // Update user streak
  static async updateUserStreak(userId) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Get current streak data
      let { data: streak, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .single();

      // If no streak record exists, create one
      if (!streak) {
        const { data: newStreak, error: createError } = await supabase
          .from('user_streaks')
          .insert([
            {
              user_id: userId,
              current_streak: 1,
              longest_streak: 1,
              last_entry_date: today,
              total_entries: 1
            }
          ])
          .select()
          .single();

        if (createError) throw createError;
        console.log("🎯 New streak started for user:", userId);
        return newStreak;
      }

      // Calculate streak logic
      const lastEntryDate = new Date(streak.last_entry_date);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastEntryDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let newCurrentStreak = streak.current_streak;
      let newLongestStreak = streak.longest_streak;

      if (diffDays === 1) {
        // Consecutive day - increment streak
        newCurrentStreak += 1;
        newLongestStreak = Math.max(newLongestStreak, newCurrentStreak);
        console.log(`🔥 Streak continued: ${newCurrentStreak} days for user:`, userId);
      } else if (diffDays === 0) {
        // Same day - don't change streak
        console.log(`✅ Entry recorded for today, streak maintained: ${newCurrentStreak} days`);
      } else {
        // Streak broken - reset to 1
        newCurrentStreak = 1;
        console.log(`🔄 Streak reset to 1 day for user:`, userId);
      }

      // Update streak record
      const { data: updatedStreak, error: updateError } = await supabase
        .from('user_streaks')
        .update({
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_entry_date: today,
          total_entries: streak.total_entries + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) throw updateError;

      return updatedStreak;

    } catch (error) {
      console.error("❌ Error updating user streak:", error.message);
      throw error;
    }
  }

  // Get user journals
  static async getUserJournals(userId, limit = 10) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await supabase
        .from('journals')
        .select('id, date, time, feeling, text, confidence_score, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      return data || [];
      
    } catch (error) {
      console.error("❌ Error fetching journals:", error.message);
      throw error;
    }
  }

  // Get user streak information
  static async getUserStreak(userId) {
    if (!this.isConfigured()) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data: streak, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If no streak exists, return default values
      if (!streak) {
        return {
          user_id: userId,
          current_streak: 0,
          longest_streak: 0,
          last_entry_date: null,
          total_entries: 0
        };
      }

      return streak;

    } catch (error) {
      console.error("❌ Error fetching user streak:", error.message);
      throw error;
    }
  }
}

export { JournalService };
export default supabase;