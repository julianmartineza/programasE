-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stages table
CREATE TABLE IF NOT EXISTS stages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id UUID REFERENCES programs ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  order_number INTEGER NOT NULL,
  educational_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stage_id UUID REFERENCES stages ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('chat', 'form', 'document')),
  description TEXT,
  prompt_template TEXT,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES programs ON DELETE CASCADE NOT NULL,
  current_stage_id UUID REFERENCES stages ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, program_id)
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content TEXT NOT NULL,
  stage_id UUID REFERENCES stages ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  is_saved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    
    CREATE POLICY "Public profiles are viewable by everyone" ON profiles
        FOR SELECT USING (true);

    CREATE POLICY "Users can update own profile" ON profiles
        FOR UPDATE USING (auth.uid() = id);
END $$;

-- Programs and stages policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Programs are viewable by everyone" ON programs;
    DROP POLICY IF EXISTS "Stages are viewable by everyone" ON stages;
    DROP POLICY IF EXISTS "Activities are viewable by everyone" ON activities;
    
    CREATE POLICY "Programs are viewable by everyone" ON programs
        FOR SELECT USING (true);

    CREATE POLICY "Stages are viewable by everyone" ON stages
        FOR SELECT USING (true);

    CREATE POLICY "Activities are viewable by everyone" ON activities
        FOR SELECT USING (true);
END $$;

-- User progress policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
    DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
    
    CREATE POLICY "Users can view own progress" ON user_progress
        FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Users can update own progress" ON user_progress
        FOR ALL USING (auth.uid() = user_id);
END $$;

-- Insights policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own insights" ON insights;
    DROP POLICY IF EXISTS "Users can manage own insights" ON insights;
    
    CREATE POLICY "Users can view own insights" ON insights
        FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Users can manage own insights" ON insights
        FOR ALL USING (auth.uid() = user_id);
END $$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DO $$ 
BEGIN
    DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
    DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
    DROP TRIGGER IF EXISTS update_stages_updated_at ON stages;
    DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;
    DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
    DROP TRIGGER IF EXISTS update_insights_updated_at ON insights;
    
    CREATE TRIGGER update_profiles_updated_at
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_programs_updated_at
        BEFORE UPDATE ON programs
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_stages_updated_at
        BEFORE UPDATE ON stages
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_activities_updated_at
        BEFORE UPDATE ON activities
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_user_progress_updated_at
        BEFORE UPDATE ON user_progress
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

    CREATE TRIGGER update_insights_updated_at
        BEFORE UPDATE ON insights
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
END $$;
