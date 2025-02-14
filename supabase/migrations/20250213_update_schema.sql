-- Agregar campo role a profiles
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE profiles 
        ADD COLUMN role TEXT NOT NULL DEFAULT 'user' 
        CHECK (role IN ('user', 'admin'));
    END IF;
END $$;

-- Crear tabla program_access si no existe
CREATE TABLE IF NOT EXISTS program_access (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES programs ON DELETE CASCADE NOT NULL,
  granted_by UUID REFERENCES profiles ON DELETE SET NULL,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, program_id)
);

-- Habilitar RLS en program_access
ALTER TABLE program_access ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS para program_access
DO $$ 
BEGIN
    -- Eliminar políticas existentes si existen
    DROP POLICY IF EXISTS "Users can view own program access" ON program_access;
    DROP POLICY IF EXISTS "Only admins can manage program access" ON program_access;
    
    -- Crear nuevas políticas
    CREATE POLICY "Users can view own program access" ON program_access
        FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Only admins can manage program access" ON program_access
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() 
                AND role = 'admin'
            )
        );
END $$;

-- Crear trigger para updated_at si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = 'update_program_access_updated_at'
    ) THEN
        CREATE TRIGGER update_program_access_updated_at
            BEFORE UPDATE ON program_access
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
