import { FC, useEffect, useState } from 'react';
import styles from './locations.module.css'
import { Location } from '@/types/app';
import { generateTypesenseClient } from '@/components/FindExecutorComponents/generateSearchclient';
import { groupBy } from '@/pages/OrganizationProfilePage';

interface Region {
  id: string
  name: string
}

interface City {
  id: string
  name: string
  region_id: string
  region_index: Region
}

const Locations: FC<{ status: 'executor' | 'orderer', locations: Location[] }> = ({ status, locations }) => {
  const [modifiedLocations, setModifiedLocations] = useState<[string, City[]][]>([]);

  useEffect(() => {
    (async () => {
      const cityFilters = locations.reduce((acc, el) => acc + el.id + ', ', '')
      const cities = await generateTypesenseClient("city_index", { filter_by: `id:[${cityFilters}]`, include_fields: "$region_index(id, name)", per_page: 250 })
      if (cities) setModifiedLocations(Object.entries(groupBy(cities.map(el => el.document) as City[], (city: City) => city.region_index.name)))
    })()
  }, [locations]);

  return (
    !!modifiedLocations.length && <div className={`container ${styles.container}`}>
      <p className={styles.title}>Локации{status === "executor" && ", в которых компания оказывает услуги"}</p>
      <div className={styles.locations}>
        {
          modifiedLocations.map((location, ind) => <div key={ind} className={styles.location}>
            <p className={styles.region}>{location[0]}</p>
            <div className={styles.cities}>
              {
                location[1].map(city =>
                  <p key={city.id} className={styles.city}>{city.name}</p>
                )
              }
            </div>
          </div>)
        }
      </div>
    </div>
  );
}

export default Locations;