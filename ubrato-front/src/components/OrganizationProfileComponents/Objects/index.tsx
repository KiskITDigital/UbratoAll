import { ObjectV } from "@/types/app";
import { FC, useEffect, useState } from "react";
import styles from './objects.module.css'
import { generateTypesenseClient } from "@/components/FindExecutorComponents/generateSearchclient";
import { groupBy } from "@/pages/OrganizationProfilePage";

interface ModifiedObject {
    id: string,
    name: string,
    object_group_index: {
        id: string,
        name: string
    }
}

const Objects: FC<{ objects: ObjectV[] }> = ({ objects }) => {
    const [modifiedObjects, setModifiedObjects] = useState<[string, ModifiedObject[]][]>([]);

    useEffect(() => {
        (async () => {
            const servicesFilters = objects.reduce((acc, el) => acc + el.id + ', ', '')
            const newObjects = await generateTypesenseClient("object_type_index", { filter_by: `id:[${servicesFilters}]`, include_fields: "$object_group_index(id, name)", per_page: 250 })
            if (newObjects) setModifiedObjects(Object.entries(groupBy(newObjects.map((el) => el.document) as ModifiedObject[], (object: ModifiedObject) => object.object_group_index.name)))
        })()
    }, [objects]);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Объекты, где компания оказывает услуги</p>
            <div className={styles.objects}>
                {
                    modifiedObjects.map((objectGroup, ind) => <div key={ind} className={styles.objectGroup}>
                        <p className={styles.objectGroupName}>{objectGroup[0]}</p>
                        <div className={styles.objectTypes}>
                            {
                                objectGroup[1].map(objectType =>
                                    <p key={objectType.id} className={styles.objectType}>{objectType.name}</p>
                                )
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
}

export default Objects;