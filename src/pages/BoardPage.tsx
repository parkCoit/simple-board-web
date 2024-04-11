
import { Board } from '@/components/common/Board';
import { BoardPagination } from '@/components/common/BoardPagination';
import { Button } from '@/components/ui/button';
import React from 'react';

export interface BoardPageProps {
    
}

const BoardPage = (props: BoardPageProps) => {
    return (
    <div className='p-4'>
      <Board/>
    </div>
    
)};

export default BoardPage;
