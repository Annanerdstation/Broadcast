import { Tester, TestCycle, MessageTemplate, AudienceTab } from '@/types';

export const mockTesters: Tester[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@example.com',
    status: 'contributed',
    joinedAt: new Date('2024-01-15'),
    lastContribution: new Date('2024-01-20'),
    customFields: { location: 'Berlin', experience: '5 years' }
  },
  {
    id: '2',
    name: 'Michael Weber',
    email: 'michael.weber@example.com',
    status: 'joined',
    joinedAt: new Date('2024-01-16'),
    customFields: { location: 'Munich', experience: '3 years' }
  },
  {
    id: '3',
    name: 'Sarah Müller',
    email: 'sarah.mueller@example.com',
    status: 'invited',
    customFields: { location: 'Hamburg', experience: '2 years' }
  },
  {
    id: '4',
    name: 'Thomas Klein',
    email: 'thomas.klein@example.com',
    status: 'contributed',
    joinedAt: new Date('2024-01-14'),
    lastContribution: new Date('2024-01-19'),
    customFields: { location: 'Cologne', experience: '7 years' }
  },
  {
    id: '5',
    name: 'Lisa Wagner',
    email: 'lisa.wagner@example.com',
    status: 'invited',
    customFields: { location: 'Frankfurt', experience: '1 year' }
  },
  {
    id: '6',
    name: 'David Fischer',
    email: 'david.fischer@example.com',
    status: 'joined',
    joinedAt: new Date('2024-01-17'),
    customFields: { location: 'Stuttgart', experience: '4 years' }
  }
];

export const mockTestCycle: TestCycle = {
  id: 'cycle-001',
  name: 'Mobile App Testing',
  description: 'Comprehensive testing of the mobile application including exploratory and usability testing',
  status: 'active',
  createdAt: new Date('2024-01-10'),
  testLeadName: 'Markus Schmidt'
};

export const mockMessageTemplates: MessageTemplate[] = [
  {
    id: 'template-1',
    name: 'Invitation Reminder',
    title: 'Join the {TestCycleName} - Your Testing Opportunity Awaits!',
    content: `Hi {TesterName},

We noticed you haven't joined the {TestCycleName} yet. This is a great opportunity to contribute to an important testing project.

**What's involved:**
• Exploratory testing of the mobile app
• Usability testing sessions
• Flexible participation - test in any order you prefer

**Next steps:**
1. Click the invitation link in your email
2. Complete the onboarding process
3. Start testing when convenient for you

If you have any questions, please reach out to {TLName} or reply to this message.

Best regards,
{TLName} and the Test IO Team`,
    category: 'invitation'
  },
  {
    id: 'template-2',
    name: 'Low Contribution Alert',
    title: 'Boost Your Testing Activity - {TestCycleName}',
    content: `Hey {TesterName}!

We're seeing low activity in the {TestCycleName} and would love to see more participation from you.

**Current status:**
• Test cycle: {TestCycleName} (ID: {TestCycleID})
• Your participation level: Below average
• Time remaining: Limited

**How you can help:**
• Complete pending test cases
• Provide detailed feedback
• Share any usability insights

**Need help?**
• Contact {TLName} directly
• Use the test chat feature
• Reply to any promotion emails

Your contribution makes a real difference!

Thanks,
{TLName} and the Test IO Team`,
    category: 'alert'
  },
  {
    id: 'template-3',
    name: 'Thank You for Contribution',
    title: 'Thank You for Your Excellent Work - {TestCycleName}',
    content: `Dear {TesterName},

Thank you for your outstanding contribution to the {TestCycleName}!

**Your achievements:**
• High-quality test execution
• Valuable feedback and insights
• Professional communication throughout

**What's next:**
• Keep an eye out for future testing opportunities
• Your feedback will be incorporated into the product
• You'll receive compensation as agreed

**Stay connected:**
• Follow us for upcoming test cycles
• Join our tester community
• Share your experience with other testers

We truly appreciate your dedication and professionalism.

Best regards,
{TLName} and the Test IO Team`,
    category: 'thank_you'
  }
];

export const audienceTabs: AudienceTab[] = [
  {
    id: 'invited',
    label: 'Invited Testers',
    description: 'All testers who have been invited to the test cycle',
    filter: (testers) => testers.filter(t => t.status === 'invited' || t.status === 'joined' || t.status === 'contributed')
  },
  {
    id: 'invited-not-joined',
    label: 'Invited but Not Joined',
    description: 'Testers who were invited but haven\'t joined yet',
    filter: (testers) => testers.filter(t => t.status === 'invited')
  },
  {
    id: 'joined',
    label: 'Joined Testers',
    description: 'Testers who have joined the test cycle',
    filter: (testers) => testers.filter(t => t.status === 'joined' || t.status === 'contributed')
  },
  {
    id: 'joined-not-contributed',
    label: 'Joined but Not Contributed',
    description: 'Testers who joined but haven\'t contributed yet',
    filter: (testers) => testers.filter(t => t.status === 'joined')
  }
];

