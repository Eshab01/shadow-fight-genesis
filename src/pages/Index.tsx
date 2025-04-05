
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import AnimationPlayer from '@/components/AnimationPlayer';

export default function Index() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">RISE OF THE SHADOW</h1>
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <AnimationPlayer />
        </CardContent>
      </Card>
    </div>
  );
}
