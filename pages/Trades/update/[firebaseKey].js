import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTradeDetails } from '../../../api/mergeData';
import TradeForm from '../../../components/Forms/TradeForm';

export default function NewTrade() {
  const [updateItem, setUpdateItem] = useState();
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTradeDetails(firebaseKey).then(setUpdateItem);
  }, [firebaseKey]);

  console.warn(updateItem);

  return (
    <>
      <TradeForm
        firebaseKey={firebaseKey}
        offerTo={updateItem?.to}
        offeredFrom={updateItem?.from}
        offeredPostObj={updateItem?.offer}
        wantedPostObj={updateItem?.want}
      />
    </>
  );
}
