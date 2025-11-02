import React from 'react';
import { AlertTriangle, SearchX } from 'lucide-react';

function StateDisplay({ type = 'empty', message }) {
  const Icon = type === 'error' ? AlertTriangle : SearchX;
  const title = type === 'error' ? 'An Error Occurred' : 'Nothing Found';
  const color = type === 'error' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center text-muted-foreground text-center px-4">
      <Icon className={`${color} w-24 h-24 mb-4`} />
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default StateDisplay;