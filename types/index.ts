export interface Tester {
  id: string;
  name: string;
  email: string;
  status: 'invited' | 'joined' | 'contributed';
  joinedAt?: Date;
  lastContribution?: Date;
  customFields?: Record<string, string>;
}

export interface TestCycle {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'draft';
  createdAt: Date;
  testLeadName: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  title: string;
  content: string;
  category: 'invitation' | 'reminder' | 'thank_you' | 'alert';
}

export interface AudienceTab {
  id: string;
  label: string;
  description: string;
  filter: (testers: Tester[]) => Tester[];
}

export interface DynamicVariable {
  key: string;
  label: string;
  description: string;
  example: string;
}

export interface BroadcastMessage {
  id?: string;
  title: string;
  content: string;
  audience: string;
  templateId?: string;
  createdAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'sent' | 'scheduled';
}
