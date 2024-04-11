
import { Button } from '@/components/ui/button';
import React from 'react';

export interface BoardPageProps {
    
}

const BoardPage = (props: BoardPageProps) => {
    return <h1 className="text-3xl font-bold underline">
      Hello world!
      <Button>벼튼</Button>
    </h1>;
    
};

export default BoardPage;
