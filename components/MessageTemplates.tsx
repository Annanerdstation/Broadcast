'use client';

import { useState } from 'react';
import { FileText, Mail, AlertTriangle, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { MessageTemplate } from '@/types';

interface MessageTemplatesProps {
  templates: MessageTemplate[];
  onTemplateSelect: (template: MessageTemplate) => void;
  className?: string;
}

const templateIcons = {
  'invitation': Mail,
  'reminder': Mail,
  'alert': AlertTriangle,
  'thank_you': Heart,
};

const templateColors = {
  'invitation': 'bg-blue-50 border-blue-200 text-blue-800',
  'reminder': 'bg-yellow-50 border-yellow-200 text-yellow-800',
  'alert': 'bg-red-50 border-red-200 text-red-800',
  'thank_you': 'bg-green-50 border-green-200 text-green-800',
};

export default function MessageTemplates({ 
  templates, 
  onTemplateSelect,
  className = ""
}: MessageTemplatesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, MessageTemplate[]>);

  const getTemplateIcon = (category: string) => {
    const IconComponent = templateIcons[category as keyof typeof templateIcons] || FileText;
    return <IconComponent size={16} />;
  };

  const getTemplateColor = (category: string) => {
    return templateColors[category as keyof typeof templateColors] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'invitation':
        return 'Invitation & Reminders';
      case 'alert':
        return 'Alerts & Notifications';
      case 'thank_you':
        return 'Thank You Messages';
      default:
        return category;
    }
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary-600" />
          <span className="font-medium text-gray-900">Message Templates</span>
          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
            {templates.length} templates
          </span>
        </div>
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Choose from predefined templates or create your own. Templates can be customized before sending.
          </p>

          <div className="space-y-3">
            {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
              <div key={category} className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 rounded transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {getTemplateIcon(category)}
                    <span className="font-medium text-gray-900">
                      {getCategoryLabel(category)}
                    </span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {categoryTemplates.length}
                    </span>
                  </div>
                  {selectedCategory === category ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>

                {selectedCategory === category && (
                  <div className="ml-6 space-y-2">
                    {categoryTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`
                          p-3 border rounded-lg cursor-pointer hover:shadow-sm transition-all
                          ${getTemplateColor(template.category)}
                        `}
                        onClick={() => onTemplateSelect(template)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <span className="text-xs opacity-75">
                            {template.category.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-sm opacity-90 mb-2 line-clamp-2">
                          {template.title}
                        </p>
                        
                        <div className="text-xs opacity-75">
                          <p className="font-medium mb-1">Preview:</p>
                          <div className="bg-white bg-opacity-50 p-2 rounded text-xs line-clamp-3">
                            {template.content.substring(0, 150)}...
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <FileText size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Template Features:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Pre-written content for common scenarios</li>
                  <li>• Includes personalization variables</li>
                  <li>• Fully customizable before sending</li>
                  <li>• Professional tone and structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
