import { JournalService } from './utils/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

async function testJournalService() {
  console.log('🧪 Testing JournalService...');
  
  console.log('Is configured?', JournalService.isConfigured());
  
  if (JournalService.isConfigured()) {
    try {
      // Test basic functionality
      const streak = await JournalService.getUserStreak('test-user');
      console.log('✅ JournalService methods work:', streak);
    } catch (error) {
      console.log('❌ JournalService error:', error.message);
    }
  } else {
    console.log('ℹ️ Supabase not configured - service will use fallback');
  }
}

testJournalService();