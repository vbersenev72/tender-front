import * as React from 'react';
import { LoaderTest } from '../../styles';
import { TailSpin } from 'react-loader-spinner';
import { useState } from 'react';

export interface IMyTendersPageProps {
}

export function MyTendersPage(props: IMyTendersPageProps) {

  const [loading, setLoading] = useState(false)


  return (
    <div>
      {loading ? (
        <LoaderTest>
          <TailSpin color="#3294F4" height={150} width={150} />
        </LoaderTest>
      )
        :
        <div>



        </div>}
    </div>
  );
}
