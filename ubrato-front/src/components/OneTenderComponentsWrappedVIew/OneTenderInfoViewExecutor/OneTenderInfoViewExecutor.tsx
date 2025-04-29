
import { OneTenderArea } from '@/components/OneTenderComponents/OneTenderArea/OneTenderArea';
import { OneTenderAttachments } from '@/components/OneTenderComponents/OneTenderAttachments/OneTenderAttachments';
import { OneTenderCity } from '@/components/OneTenderComponents/OneTenderCity/OneTenderCity';
import { OneTenderDescription } from '@/components/OneTenderComponents/OneTenderDescription/OneTenderDescription';
import { OneTenderExecutorNotification } from '@/components/OneTenderComponents/OneTenderExecutorNotice/OneTenderExecutorNoyification';
import { OneTenderInfoExecutor } from '@/components/OneTenderComponents/OneTenderInfoExecutor/OneTenderInfoExecutor';
import { OneTenderObject } from '@/components/OneTenderComponents/OneTenderObject/OneTenderObject';
import { OneTenderOffers } from '@/components/OneTenderComponents/OneTenderOffers/OneTenderOffers';
import { OneTenderWishes } from '@/components/OneTenderComponents/OneTenderWishes/OneTenderWishes';
import { dataObjectTypes } from '@/pages/OneTenderPageExecutor/OneTenderPageExecutor';

import { FC } from 'react';

interface tenderProps {
  dataTender: dataObjectTypes
}

export type Category = {
  name: string
  services: string[]
}

export const OneTenderInfoViewExecutor: FC<tenderProps> = ({ dataTender }) => {

  return (
    <div>
      <OneTenderInfoExecutor
        is_contract_price={dataTender.is_contract_price}
        price={dataTender.price}
        timestamp_rc_start={dataTender.reception_start}
        timestamp_rc_end={dataTender.reception_end}
        timestamp_wrk_start={dataTender.work_start}
        timestamp_wrk_end={dataTender.work_end}
        timestamp_crtd={dataTender.created_at}
        is_nds={dataTender.is_nds_price}
      />
      <OneTenderExecutorNotification />
      <OneTenderCity city={dataTender.location} />
      <OneTenderObject objectGroup={dataTender.object_group} objectsTypes={dataTender.objects_types} />
      <OneTenderArea area={dataTender.floor_space} />
      <OneTenderOffers categories={dataTender.categories} />
      <OneTenderDescription description={dataTender.description} />
      <OneTenderWishes wishes={dataTender.wishes} />
      <OneTenderAttachments attachment={dataTender.attachments} />
    </div>
  );
};
