# Broadcast - Unified Communication Tool

A modern, lightweight communication tool for Test IO / TaaS teams to efficiently communicate with testers across all funnel stages. This tool enhances the existing Broadcast feature with advanced audience targeting, rich text editing, personalization, and predefined templates.

## Features

### 🎯 Audience Selection
- **Invited Testers**: All testers who have been invited to the test cycle
- **Invited but Not Joined**: Testers who were invited but haven't joined yet
- **Joined Testers**: Testers who have joined the test cycle
- **Joined but Not Contributed**: Testers who joined but haven't contributed yet

### ✏️ Rich Text Editor
- Title field for message subject
- Bold and italic formatting
- Bullet points and numbered lists
- Hyperlink support
- Clean, intuitive interface

### 🎨 Personalization
Dynamic variable support for:
- `{TesterName}` - Individual tester name
- `{TestCycleName}` - Current test cycle name
- `{TestCycleID}` - Test cycle identifier
- `{TLName}` - Test lead name
- `{CustomFields}` - Future-proofing for custom fields

### 📝 Message Templates
Predefined templates for common scenarios:
- **Invitation Reminder**: Encourage testers to join
- **Low Contribution Alert**: Boost participation
- **Thank You for Contribution**: Acknowledge good work

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Rich Text Editor**: TipTap
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Broadcast
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Broadcast/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── AudienceTabs.tsx   # Audience selection tabs
│   ├── MessageTemplates.tsx # Template selection
│   ├── PersonalizationPanel.tsx # Variable insertion
│   └── RichTextEditor.tsx # Rich text editor
├── data/                  # Mock data and types
│   └── mockData.ts        # Sample data
├── types/                 # TypeScript type definitions
│   └── index.ts           # Interface definitions
└── package.json           # Dependencies and scripts
```

## Key Components

### AudienceTabs
Displays different tester categories with counts and detailed lists. Each tab shows relevant testers with their status, join date, and custom fields.

### RichTextEditor
Built with TipTap, provides a clean WYSIWYG editing experience with essential formatting options. Includes a toolbar with bold, italic, lists, and link functionality.

### PersonalizationPanel
Collapsible panel that allows users to insert dynamic variables into their messages. Shows examples and descriptions for each variable type.

### MessageTemplates
Organized template library with categories for different message types. Templates can be selected and customized before sending.

## Usage

1. **Select Audience**: Choose from the four audience tabs to target specific tester groups
2. **Choose Template** (optional): Select from predefined templates or start from scratch
3. **Compose Message**: Use the rich text editor to create your message with title and content
4. **Add Personalization**: Insert dynamic variables for personalized communication
5. **Preview & Send**: Preview the message and send to selected testers

## Future Enhancements

- Custom field support for advanced personalization
- Message scheduling capabilities
- Analytics and delivery tracking
- Integration with existing Test IO systems
- Advanced template management
- Bulk message operations

## Contributing

This is a frontend-only implementation designed to demonstrate the unified communication tool concept. For production use, integrate with your existing backend systems and APIs.

## License

This project is part of the Test IO / TaaS communication enhancement initiative.
