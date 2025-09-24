import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Testing Supabase Configuration...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Loaded' : '❌ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing');

if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  console.log('🎯 Both environment variables are present!');
  console.log('URL starts with:', process.env.SUPABASE_URL.substring(0, 20) + '...');
  console.log('Key starts with:', process.env.SUPABASE_ANON_KEY.substring(0, 10) + '...');
} else {
  console.log('❌ Please check your .env file configuration');
}