import React from "react";

type ModuleCardProps = {
  name: string;
  path: string;
  classType: string;
  onExecute: () => void;
};

export const ModuleCard: React.FC<ModuleCardProps> = ({ name, path, classType, onExecute }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">Path: {path}</p>
      <p className="text-sm text-gray-600">Class: {classType}</p>
      <button
        onClick={onExecute}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Execute
      </button>
    </div>
  );
};
