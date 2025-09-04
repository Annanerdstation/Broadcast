'use client';

import { useState } from 'react';
import { Variable, Plus, Info } from 'lucide-react';
import { DynamicVariable, TestCycle } from '@/types';

interface PersonalizationPanelProps {
  variables: DynamicVariable[];
  testCycle: TestCycle;
  onVariableInsert: (variable: string) => void;
  className?: string;
}

export default function PersonalizationPanel({ 
  variables, 
  testCycle, 
  onVariableInsert,
  className = ""
}: PersonalizationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVariableValue = (key: string): string => {
    switch (key) {
      case '{TestCycleName}':
        return testCycle.name;
      case '{TestCycleID}':
        return testCycle.id;
      case '{TLName}':
        return testCycle.testLeadName;
      default:
        return 'Example Value';
    }
  };

  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Variable size={16} className="text-primary-600" />
          <span className="font-medium text-gray-900">Personalization Variables</span>
          <Info size={14} className="text-gray-400" />
        </div>
        <Plus 
          size={16} 
          className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-45' : ''}`} 
        />
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Click on any variable to insert it into your message. Variables will be automatically replaced with actual values when sent.
          </p>
          
          <div className="grid gap-2">
            {variables.map((variable) => (
              <div
                key={variable.key}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => onVariableInsert(variable.key)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {variable.key}
                    </code>
                    <span className="text-sm font-medium text-gray-900">
                      {variable.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {variable.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Example:</span>
                    <span className="text-xs font-medium text-gray-700">
                      {getVariableValue(variable.key)}
                    </span>
                  </div>
                </div>
                <Plus 
                  size={16} 
                  className="text-gray-400 group-hover:text-primary-600 transition-colors" 
                />
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Variables are replaced with actual values for each tester</li>
                  <li>• {TesterName} will show each tester's individual name</li>
                  <li>• Test cycle and TL information is automatically populated</li>
                  <li>• Custom fields support is coming soon</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
