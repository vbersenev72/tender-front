import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select'


export interface ITagsPageProps {
}

export function TagsPage(props: ITagsPageProps) {

  const [tags, setTags] = useState<any>([])

  useEffect(() => {

  }, [])


  return (
    <div className='TagsPage-container'>
      <div className="TagsPage-content">
        <Select />
      </div>
    </div>
  );
}
