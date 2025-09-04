'use client';

import { useState } from 'react';
import { Users, UserCheck, UserX, UserMinus } from 'lucide-react';
import { AudienceTab, Tester } from '@/types';

interface AudienceTabsProps {
  tabs: AudienceTab[];
  testers: Tester[];
  selectedTab: string;
  onTabChange: (tabId: string) => void;
}

const tabIcons = {
  'invited': Users,
  'invited-not-joined': UserX,
  'joined': UserCheck,
  'joined-not-contributed': UserMinus,
};

export default function AudienceTabs({ 
  tabs, 
  testers, 
  selectedTab, 
  onTabChange 
}: AudienceTabsProps) {
  const getFilteredTesters = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab ? tab.filter(testers) : [];
  };

  const getTabIcon = (tabId: string) => {
    const IconComponent = tabIcons[tabId as keyof typeof tabIcons] || Users;
    return <IconComponent size={16} />;
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const filteredTesters = getFilteredTesters(tab.id);
          const isActive = selectedTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'tab-active shadow-sm' 
                  : 'tab-inactive'
                }
              `}
            >
              {getTabIcon(tab.id)}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-semibold
                ${isActive 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {filteredTesters.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Description */}
      <div className="text-sm text-gray-600">
        {tabs.find(t => t.id === selectedTab)?.description}
      </div>

      {/* Tester List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">
            {tabs.find(t => t.id === selectedTab)?.label} 
            <span className="text-gray-500 font-normal ml-2">
              ({getFilteredTesters(selectedTab).length} testers)
            </span>
          </h3>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {getFilteredTesters(selectedTab).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No testers found in this category</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {getFilteredTesters(selectedTab).map((tester) => (
                <div key={tester.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {tester.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tester.name}</p>
                          <p className="text-sm text-gray-500">{tester.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${tester.status === 'contributed' 
                          ? 'bg-green-100 text-green-700' 
                          : tester.status === 'joined' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                        }
                      `}>
                        {tester.status}
                      </span>
                      
                      {tester.joinedAt && (
                        <span className="text-xs text-gray-500">
                          Joined {tester.joinedAt.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {tester.customFields && (
                    <div className="mt-2 flex gap-2">
                      {Object.entries(tester.customFields).map(([key, value]) => (
                        <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
