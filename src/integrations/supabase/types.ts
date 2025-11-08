export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      account_deletion_logs: {
        Row: {
          balance_at_deletion: number | null
          created_at: string | null
          deleted_at: string | null
          feedback: string | null
          id: string
          reason: string | null
          transfer_phone: string | null
          transfer_requested: boolean | null
          user_data: Json | null
          user_email: string
          user_id: string
        }
        Insert: {
          balance_at_deletion?: number | null
          created_at?: string | null
          deleted_at?: string | null
          feedback?: string | null
          id?: string
          reason?: string | null
          transfer_phone?: string | null
          transfer_requested?: boolean | null
          user_data?: Json | null
          user_email: string
          user_id: string
        }
        Update: {
          balance_at_deletion?: number | null
          created_at?: string | null
          deleted_at?: string | null
          feedback?: string | null
          id?: string
          reason?: string | null
          transfer_phone?: string | null
          transfer_requested?: boolean | null
          user_data?: Json | null
          user_email?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          admin_id: string
          id: number
          ip_address: string | null
          reason: string | null
          target_user_id: string | null
          timestamp: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id: string
          id?: number
          ip_address?: string | null
          reason?: string | null
          target_user_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          id?: number
          ip_address?: string | null
          reason?: string | null
          target_user_id?: string | null
          timestamp?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      balance_transfer_requests: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          processed_at: string | null
          status: string | null
          transfer_to_phone: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          status?: string | null
          transfer_to_phone: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          processed_at?: string | null
          status?: string | null
          transfer_to_phone?: string
          user_id?: string
        }
        Relationships: []
      }
      config_airtime_networks: {
        Row: {
          commission_rate: number | null
          created_at: string | null
          display_name: string
          enabled: boolean | null
          max_amount: number | null
          min_amount: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string | null
          display_name: string
          enabled?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          commission_rate?: number | null
          created_at?: string | null
          display_name?: string
          enabled?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      config_payment_methods: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          enabled: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          enabled?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          enabled?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      fees: {
        Row: {
          fee_amount: number | null
          id: number
          inserted_at: string | null
          max_amount: number | null
          min_amount: number
          percentage_fee: number | null
          updated_at: string | null
        }
        Insert: {
          fee_amount?: number | null
          id?: number
          inserted_at?: string | null
          max_amount?: number | null
          min_amount: number
          percentage_fee?: number | null
          updated_at?: string | null
        }
        Update: {
          fee_amount?: number | null
          id?: number
          inserted_at?: string | null
          max_amount?: number | null
          min_amount?: number
          percentage_fee?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      float_balance_history: {
        Row: {
          account_type: string
          amount: number
          balance_after: number
          balance_before: number
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          transaction_id: string
          transaction_type: string
        }
        Insert: {
          account_type: string
          amount: number
          balance_after: number
          balance_before: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          transaction_id: string
          transaction_type: string
        }
        Update: {
          account_type?: string
          amount?: number
          balance_after?: number
          balance_before?: number
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          transaction_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_float_balance_history_account"
            columns: ["account_type"]
            isOneToOne: false
            referencedRelation: "float_balances"
            referencedColumns: ["account_type"]
          },
        ]
      }
      float_balances: {
        Row: {
          account_type: string
          available_balance: number
          balance: number
          created_at: string | null
          currency: string
          id: string
          last_transaction_amount: number | null
          last_transaction_id: string | null
          last_transaction_type: string | null
          pending_balance: number
          updated_at: string | null
        }
        Insert: {
          account_type: string
          available_balance?: number
          balance?: number
          created_at?: string | null
          currency?: string
          id?: string
          last_transaction_amount?: number | null
          last_transaction_id?: string | null
          last_transaction_type?: string | null
          pending_balance?: number
          updated_at?: string | null
        }
        Update: {
          account_type?: string
          available_balance?: number
          balance?: number
          created_at?: string | null
          currency?: string
          id?: string
          last_transaction_amount?: number | null
          last_transaction_id?: string | null
          last_transaction_type?: string | null
          pending_balance?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      mpesa_payments: {
        Row: {
          account_reference: string
          amount: number
          callback_metadata: Json | null
          checkout_request_id: string
          created_at: string | null
          id: string
          merchant_request_id: string | null
          mpesa_receipt_number: string | null
          phone_number: string
          result_code: string | null
          result_desc: string | null
          status: string | null
          transaction_date: string | null
          transaction_desc: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_reference: string
          amount: number
          callback_metadata?: Json | null
          checkout_request_id: string
          created_at?: string | null
          id?: string
          merchant_request_id?: string | null
          mpesa_receipt_number?: string | null
          phone_number: string
          result_code?: string | null
          result_desc?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_desc: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_reference?: string
          amount?: number
          callback_metadata?: Json | null
          checkout_request_id?: string
          created_at?: string | null
          id?: string
          merchant_request_id?: string | null
          mpesa_receipt_number?: string | null
          phone_number?: string
          result_code?: string | null
          result_desc?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_desc?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notification_logs: {
        Row: {
          body: string | null
          category: string
          created_at: string | null
          id: string
          sent_at: string | null
          status: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          body?: string | null
          category: string
          created_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          body?: string | null
          category?: string
          created_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_queue: {
        Row: {
          attempts: number | null
          body: string | null
          category: string
          created_at: string | null
          data: Json | null
          id: string
          max_attempts: number | null
          scheduled_for: string | null
          status: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          body?: string | null
          category: string
          created_at?: string | null
          data?: Json | null
          id?: string
          max_attempts?: number | null
          scheduled_for?: string | null
          status?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          body?: string | null
          category?: string
          created_at?: string | null
          data?: Json | null
          id?: string
          max_attempts?: number | null
          scheduled_for?: string | null
          status?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          is_read: boolean
          message: string
          priority: string | null
          timestamp: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          is_read?: boolean
          message: string
          priority?: string | null
          timestamp?: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          is_read?: boolean
          message?: string
          priority?: string | null
          timestamp?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      otp_sessions: {
        Row: {
          amount: number
          created_at: string
          expires_at: string
          id: string
          otp: string
          phone_number: string
          user_id: string
          verified: boolean
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at: string
          id?: string
          otp: string
          phone_number: string
          user_id: string
          verified?: boolean
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string
          id?: string
          otp?: string
          phone_number?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "fk_otp_sessions_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          callback_url: string | null
          completed_at: string | null
          created_at: string
          currency: string
          external_payment_id: string | null
          failure_reason: string | null
          id: string
          initiated_at: string
          metadata: Json
          payment_intent: string | null
          payment_method: string
          payment_provider: string | null
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          external_payment_id?: string | null
          failure_reason?: string | null
          id?: string
          initiated_at?: string
          metadata?: Json
          payment_intent?: string | null
          payment_method: string
          payment_provider?: string | null
          status: string
          transaction_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          callback_url?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          external_payment_id?: string | null
          failure_reason?: string | null
          id?: string
          initiated_at?: string
          metadata?: Json
          payment_intent?: string | null
          payment_method?: string
          payment_provider?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_payments_transaction_id"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_payments_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      project_comments: {
        Row: {
          comment: string
          created_at: string
          email: string
          id: string
          name: string
          project_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          comment: string
          created_at?: string
          email: string
          id?: string
          name: string
          project_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          comment?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          project_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          content: string | null
          created_at: string
          featured: boolean | null
          id: string
          image_url: string | null
          platform: string | null
          published_at: string | null
          read_time: number | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          platform?: string | null
          published_at?: string | null
          read_time?: number | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          platform?: string | null
          published_at?: string | null
          read_time?: number | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      article_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_tags_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string
          description: string | null
          id: string
          tag: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          tag: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          tag?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_settings: {
        Row: {
          calendar_url: string | null
          created_at: string
          email: string
          id: string
          location: string | null
          phone: string | null
          preferred_response_time: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          calendar_url?: string | null
          created_at?: string
          email: string
          id?: string
          location?: string | null
          phone?: string | null
          preferred_response_time?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          calendar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          location?: string | null
          phone?: string | null
          preferred_response_time?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          achievements: string[] | null
          company: string
          created_at: string
          description: string | null
          id: string
          location: string | null
          order_index: number | null
          period: string | null
          position: string
          responsibilities: string[] | null
          tech: string[] | null
          type: string | null
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          order_index?: number | null
          period?: string | null
          position: string
          responsibilities?: string[] | null
          tech?: string[] | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          order_index?: number | null
          period?: string | null
          position?: string
          responsibilities?: string[] | null
          tech?: string[] | null
          type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          graduation_date: string | null
          highlights: string[] | null
          id: string
          institution: string
          location: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          graduation_date?: string | null
          highlights?: string[] | null
          id?: string
          institution: string
          location?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          graduation_date?: string | null
          highlights?: string[] | null
          id?: string
          institution?: string
          location?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image_url: string | null
          contact_cta: string | null
          created_at: string
          headline: string
          id: string
          profile_image_url: string | null
          resume_url: string | null
          roles: string[] | null
          subheadline: string | null
          summary: string | null
          updated_at: string
        }
        Insert: {
          background_image_url?: string | null
          contact_cta?: string | null
          created_at?: string
          headline: string
          id?: string
          profile_image_url?: string | null
          resume_url?: string | null
          roles?: string[] | null
          subheadline?: string | null
          summary?: string | null
          updated_at?: string
        }
        Update: {
          background_image_url?: string | null
          contact_cta?: string | null
          created_at?: string
          headline?: string
          id?: string
          profile_image_url?: string | null
          resume_url?: string | null
          roles?: string[] | null
          subheadline?: string | null
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          order_index: number | null
          skills: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          order_index?: number | null
          skills: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          order_index?: number | null
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          is_primary: boolean | null
          order_index: number | null
          platform: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          platform: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          platform?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string
          email: string | null
          featured: boolean | null
          id: string
          name: string
          order_index: number | null
          rating: number | null
          role: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string
          email?: string | null
          featured?: boolean | null
          id?: string
          name: string
          order_index?: number | null
          rating?: number | null
          role?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string
          email?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          order_index?: number | null
          rating?: number | null
          role?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          id: string
          issued_on: string | null
          issuer: string
          logo_url: string | null
          name: string
          order_index: number | null
          skills: string[] | null
          status: string | null
          updated_at: string
          verification_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          issued_on?: string | null
          issuer: string
          logo_url?: string | null
          name: string
          order_index?: number | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string
          verification_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          issued_on?: string | null
          issuer?: string
          logo_url?: string | null
          name?: string
          order_index?: number | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string
          verification_url?: string | null
        }
        Relationships: []
      }
      testimonial_submissions: {
        Row: {
          company: string | null
          content: string
          created_at: string
          email: string | null
          id: string
          name: string
          rating: number | null
          role: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          content: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          rating?: number | null
          role?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          content?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          rating?: number | null
          role?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string
          demo_url: string | null
          description: string
          features: string[] | null
          highlights: string[] | null
          id: string
          image_url: string | null
          status: string
          tech: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          demo_url?: string | null
          description: string
          features?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          status?: string
          tech?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          demo_url?: string | null
          description?: string
          features?: string[] | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          status?: string
          tech?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_at: string | null
          id: string
          referral_code: string
          referred_id: string | null
          referrer_id: string | null
          reward_amount: number | null
          rewarded_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          referral_code: string
          referred_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          rewarded_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          rewarded_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      security_logs: {
        Row: {
          action: string
          created_at: string | null
          device_id: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          device_id?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          description: string | null
          id: string
          metadata: Json
          mpesa_reference: string | null
          network: string | null
          phone_number: string | null
          status: string
          timestamp: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          description?: string | null
          id?: string
          metadata?: Json
          mpesa_reference?: string | null
          network?: string | null
          phone_number?: string | null
          status: string
          timestamp?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          description?: string | null
          id?: string
          metadata?: Json
          mpesa_reference?: string | null
          network?: string | null
          phone_number?: string | null
          status?: string
          timestamp?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_transactions_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_id: string | null
          device_name: string | null
          device_type: string | null
          expired_at: string | null
          expires_at: string | null
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity: string | null
          location_data: Json | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_type?: string | null
          expired_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          location_data?: Json | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_type?: string | null
          expired_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity?: string | null
          location_data?: Json | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          admin_reset_at: string | null
          admin_reset_by: string | null
          admin_reset_reason: string | null
          balance: number
          commission: number | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          full_name: string
          has_completed_onboarding: boolean
          has_transaction_pin: boolean | null
          id: string
          image_url: string | null
          last_successful_pin_verification: string | null
          notification_preferences: Json | null
          phone_number: string
          phone_verified: boolean | null
          pin_attempts: number | null
          pin_created_at: string | null
          pin_disabled_at: string | null
          pin_locked_until: string | null
          pin_reset_completed_at: string | null
          pin_reset_expires_at: string | null
          pin_reset_initiated_at: string | null
          pin_reset_method: string | null
          pin_reset_token_hash: string | null
          pin_salt: string | null
          push_token: string | null
          referral_code: string | null
          referred_by: string | null
          security_question: string | null
          security_question_hash: string | null
          security_question_set_at: string | null
          supabase_id: string
          transaction_pin_hash: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          admin_reset_at?: string | null
          admin_reset_by?: string | null
          admin_reset_reason?: string | null
          balance?: number
          commission?: number | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          full_name: string
          has_completed_onboarding?: boolean
          has_transaction_pin?: boolean | null
          id?: string
          image_url?: string | null
          last_successful_pin_verification?: string | null
          notification_preferences?: Json | null
          phone_number: string
          phone_verified?: boolean | null
          pin_attempts?: number | null
          pin_created_at?: string | null
          pin_disabled_at?: string | null
          pin_locked_until?: string | null
          pin_reset_completed_at?: string | null
          pin_reset_expires_at?: string | null
          pin_reset_initiated_at?: string | null
          pin_reset_method?: string | null
          pin_reset_token_hash?: string | null
          pin_salt?: string | null
          push_token?: string | null
          referral_code?: string | null
          referred_by?: string | null
          security_question?: string | null
          security_question_hash?: string | null
          security_question_set_at?: string | null
          supabase_id: string
          transaction_pin_hash?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          admin_reset_at?: string | null
          admin_reset_by?: string | null
          admin_reset_reason?: string | null
          balance?: number
          commission?: number | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string
          has_completed_onboarding?: boolean
          has_transaction_pin?: boolean | null
          id?: string
          image_url?: string | null
          last_successful_pin_verification?: string | null
          notification_preferences?: Json | null
          phone_number?: string
          phone_verified?: boolean | null
          pin_attempts?: number | null
          pin_created_at?: string | null
          pin_disabled_at?: string | null
          pin_locked_until?: string | null
          pin_reset_completed_at?: string | null
          pin_reset_expires_at?: string | null
          pin_reset_initiated_at?: string | null
          pin_reset_method?: string | null
          pin_reset_token_hash?: string | null
          pin_salt?: string | null
          push_token?: string | null
          referral_code?: string | null
          referred_by?: string | null
          security_question?: string | null
          security_question_hash?: string | null
          security_question_set_at?: string | null
          supabase_id?: string
          transaction_pin_hash?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      clean_expired_pending_withdrawals: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_otp_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      correct_user_balance: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      create_payment: {
        Args: {
          p_amount: number
          p_callback_url?: string
          p_external_payment_id?: string
          p_payment_intent?: string
          p_payment_method: string
          p_payment_provider: string
          p_transaction_id: string
          p_user_id: string
        }
        Returns: {
          amount: number
          callback_url: string | null
          completed_at: string | null
          created_at: string
          currency: string
          external_payment_id: string | null
          failure_reason: string | null
          id: string
          initiated_at: string
          metadata: Json
          payment_intent: string | null
          payment_method: string
          payment_provider: string | null
          status: string
          transaction_id: string | null
          updated_at: string
          user_id: string
        }
      }
      create_user_session: {
        Args: {
          p_device_id: string
          p_device_name: string
          p_device_type: string
          p_ip_address: unknown
          p_location_data: Json
          p_session_token: string
          p_user_agent: string
          p_user_id: string
        }
        Returns: string
      }
      delete_old_pending_transactions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_fee: {
        Args: { amount: number }
        Returns: Json
      }
      get_float_balance: {
        Args: { p_account_type: string }
        Returns: Json
      }
      get_user_sessions: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          device_name: string
          device_type: string
          id: string
          ip_address: unknown
          is_active: boolean
          last_activity: string
        }[]
      }
      get_user_stats: {
        Args: { p_user_id: number }
        Returns: Json
      }
      insert_transaction: {
        Args: {
          p_amount: number
          p_description?: string
          p_metadata?: Json
          p_mpesa_reference?: string
          p_network?: string
          p_phone_number?: string
          p_status?: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      invalidate_session: {
        Args: { p_session_token: string }
        Returns: undefined
      }
      log_security_event: {
        Args: {
          action: string
          device_id?: string
          ip?: string
          metadata?: Json
          user_agent?: string
        }
        Returns: undefined
      }
      process_referral_bonus: {
        Args: { p_referred_user_id: number }
        Returns: undefined
      }
      process_transaction: {
        Args: {
          p_amount: number
          p_description?: string
          p_mpesa_reference?: string
          p_network?: string
          p_phone_number?: string
          p_type: string
          p_user_id: string
        }
        Returns: {
          amount: number
          description: string | null
          id: string
          metadata: Json
          mpesa_reference: string | null
          network: string | null
          phone_number: string | null
          status: string
          timestamp: string
          type: string
          user_id: string
        }
      }
      reset_transaction_pin: {
        Args: {
          p_new_pin: string
          p_user_id: string
          p_verification_code: string
        }
        Returns: boolean
      }
      sell_airtime_wallet_transaction: {
        Args: {
          p_airtime_result: Json
          p_amount: number
          p_description: string
          p_network: string
          p_previous_balance: number
          p_receiver_phone: string
          p_request_id: string
          p_request_metadata?: Json
          p_user_id: string
        }
        Returns: Json
      }
      update_float_balance: {
        Args: {
          p_account_type: string
          p_amount: number
          p_description?: string
          p_metadata?: Json
          p_transaction_id: string
          p_transaction_type: string
        }
        Returns: Json
      }
      update_session_activity: {
        Args: { p_session_token: string }
        Returns: undefined
      }
      validate_password_update: {
        Args: { p_current_password: string; p_user_id: string }
        Returns: boolean
      }
      validate_transaction_pin: {
        Args: { p_pin: string; p_user_id: string }
        Returns: boolean
      }
      verify_user_balance: {
        Args: { user_uuid: string }
        Returns: {
          calculated_balance: number
          current_balance: number
          difference: number
          needs_correction: boolean
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
