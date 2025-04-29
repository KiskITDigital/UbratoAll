import { FC, useEffect, useState } from 'react';
import styles from './services.module.css'
import { Service } from '@/types/app';
import { generateTypesenseClient } from '@/components/FindExecutorComponents/generateSearchclient';
import { groupBy } from '@/pages/OrganizationProfilePage';
import { modifyPrice } from '@/components/FindExecutorComponents/ExecutorItem';

interface ModifiedService {
    id: string,
    name: string,
    price: number,
    service_group_index: {
        id: string,
        name: string
    }
}

const Services: FC<{ services: Service[] }> = ({ services }) => {
    const [modifiedServices, setModifiedServices] = useState<[string, ModifiedService[]][]>([]);

    useEffect(() => {
        (async () => {
            const servicesFilters = services.reduce((acc, el) => acc + el.id + ', ', '')
            const newServices = await generateTypesenseClient("service_type_index", { filter_by: `id:[${servicesFilters}]`, include_fields: "$service_group_index(id, name)", per_page: 250 })
            if (newServices) setModifiedServices(Object.entries(groupBy(newServices
                .map((el) => el.document)
                .map((service) => {
                    let serviceToFindPrice: number = 0;
                    if ("id" in service) serviceToFindPrice = services.find(el => el.id.toString() === service.id)?.price || 0
                    return ({ ...service, price: serviceToFindPrice })
                }) as ModifiedService[], (service: ModifiedService) => service.service_group_index.name)))
        })()
    }, [services]);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Услуги, которые оказывает компания</p>
            <div className={styles.services}>
                {
                    modifiedServices.map((serviceGroup, ind) => <div key={ind} className={styles.serviceGroup}>
                        <p className={styles.serviceGroupName}>{serviceGroup[0]}</p>
                        <div className={styles.serviceTypes}>
                            {
                                serviceGroup[1].map(serviceType => <div className={styles.serviceType} key={serviceType.id}>
                                    <p className={styles.serviceTypeName}>{serviceType.name}</p>
                                    <p className={styles.serviceTypePrice}>от {modifyPrice(serviceType.price)}</p>
                                </div>)
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default Services;