'use client';

import { useState } from 'react';
import { Send, Save, Eye, Users, MessageSquare } from 'lucide-react';
import AudienceTabs from '@/components/AudienceTabs';
import RichTextEditor from '@/components/RichTextEditor';
import PersonalizationPanel from '@/components/PersonalizationPanel';
import MessageTemplates from '@/components/MessageTemplates';
import { 
  mockTesters, 
  mockTestCycle, 
  mockMessageTemplates, 
  audienceTabs, 
  dynamicVariables 
} from '@/data/mockData';
import { MessageTemplate, BroadcastMessage } from '@/types';

export default function BroadcastPage() {
  const [selectedAudience, setSelectedAudience] = useState('invited');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setMessageTitle(template.title);
    setMessageContent(template.content);
  };

  const handleVariableInsert = (variable: string) => {
    // Insert variable at cursor position in the editor
    // For now, we'll append it to the content
    setMessageContent(prev => prev + variable);
  };

  const handleSendMessage = () => {
    const selectedTesters = audienceTabs
      .find(tab => tab.id === selectedAudience)
      ?.filter(mockTesters) || [];

    const message: BroadcastMessage = {
      title: messageTitle,
      content: messageContent,
      audience: selectedAudience,
      templateId: selectedTemplate?.id,
      status: 'sent',
      sentAt: new Date(),
    };

    console.log('Sending message:', message);
    console.log('To testers:', selectedTesters);
    
    // Here you would typically send the message via API
    alert(`Message sent to ${selectedTesters.length} testers!`);
  };

  const handleSaveDraft = () => {
    const message: BroadcastMessage = {
      title: messageTitle,
      content: messageContent,
      audience: selectedAudience,
      templateId: selectedTemplate?.id,
      status: 'draft',
    };

    console.log('Saving draft:', message);
    alert('Draft saved successfully!');
  };

  const handlePreview = () => {
    const selectedTesters = audienceTabs
      .find(tab => tab.id === selectedAudience)
      ?.filter(mockTesters) || [];

    // Show preview with first tester's data
    const previewTester = selectedTesters[0];
    if (previewTester) {
      let previewContent = messageContent;
      previewContent = previewContent.replace(/{TesterName}/g, previewTester.name);
      previewContent = previewContent.replace(/{TestCycleName}/g, mockTestCycle.name);
      previewContent = previewContent.replace(/{TestCycleID}/g, mockTestCycle.id);
      previewContent = previewContent.replace(/{TLName}/g, mockTestCycle.testLeadName);

      alert(`Preview for ${previewTester.name}:\n\nTitle: ${messageTitle}\n\nContent:\n${previewContent}`);
    } else {
      alert('No testers selected for preview');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-primary-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">
                Unified Communication Tool
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span>Test Cycle: {mockTestCycle.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Templates and Personalization */}
          <div className="lg:col-span-1 space-y-6">
            <MessageTemplates
              templates={mockMessageTemplates}
              onTemplateSelect={handleTemplateSelect}
            />
            
            <PersonalizationPanel
              variables={dynamicVariables}
              testCycle={mockTestCycle}
              onVariableInsert={handleVariableInsert}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audience Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Audience
              </h2>
              <AudienceTabs
                tabs={audienceTabs}
                testers={mockTesters}
                selectedTab={selectedAudience}
                onTabChange={setSelectedAudience}
              />
            </div>

            {/* Message Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Compose Message
              </h2>
              
              <div className="space-y-4">
                {/* Title Field */}
                <div>
                  <label htmlFor="message-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Message Title
                  </label>
                  <input
                    id="message-title"
                    type="text"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Enter message title..."
                    className="input-field"
                  />
                </div>

                {/* Message Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content
                  </label>
                  <RichTextEditor
                    content={messageContent}
                    onChange={setMessageContent}
                    placeholder="Start typing your message..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSaveDraft}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Draft
                  </button>
                  
                  <button
                    onClick={handlePreview}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!messageTitle.trim() || !messageContent.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
