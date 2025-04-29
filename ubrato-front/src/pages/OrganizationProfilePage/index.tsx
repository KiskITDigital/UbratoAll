import { FC, useEffect, useRef, useState } from "react";
import { Link, Params, useNavigate, useNavigationType, useParams } from "react-router-dom";
import { addFavoriteExecutor, getOtherProfilesOrganizations, isFavoriteExecutor, removeFavoriteExecutor } from "@/api";
import Info from "@/components/OrganizationProfileComponents/Info";
import styles from './organization-profile-page.module.css';
import { ErrorInfo, ExecutorProfileInfo, OrdererProfileInfo } from "@/types/app";
import Description from "@/components/OrganizationProfileComponents/Description";
import Locations from "@/components/OrganizationProfileComponents/Locations";
import Services from "@/components/OrganizationProfileComponents/Services";
import Objects from "@/components/OrganizationProfileComponents/Objects";
import Portfolio from "@/components/OrganizationProfileComponents/Portfolio";
import { useUserInfoStore } from "@/store/userInfoStore";

// eslint-disable-next-line react-refresh/only-export-components
export function groupBy<T>(iterable: Iterable<T>, fn: (item: T) => string | number) {
    return [...iterable].reduce<Record<string, T[]>>((groups, curr) => {
        const key = fn(curr);
        const group = groups[key] ?? [];
        group.push(curr);
        return { ...groups, [key]: group };
    }, {});
}

const OrganizationProfilePage: FC = () => {


    const { org_id }: Readonly<Params<string>> = useParams();
    const navigate = useNavigate();
    const navigationType = useNavigationType()
    const userInfoStore = useUserInfoStore()

    const startRef = useRef<HTMLHeadingElement>(null)

    const [data, setData] = useState<ErrorInfo | ExecutorProfileInfo | OrdererProfileInfo | null>(null);

    useEffect(() => {
        if (!userInfoStore.isLoggedIn) {
          if (navigationType === "POP")
            navigate(-1)
          else
            navigate('/login');
        }
      }, [navigate]);

    const favoriteExecutorsHandler = async (organization: { id: string, isFavorite: boolean }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const res = organization.isFavorite
            ? removeFavoriteExecutor(organization.id, token)
            : addFavoriteExecutor(organization.id, token);

        const resStatus = (await res).data.status ? !organization.isFavorite : organization.isFavorite;

        if (data && 'isFavorite' in data) {
            setData({
                ...data,
                isFavorite: resStatus
            });
        }
    };

    useEffect(() => {
        startRef.current!.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
            const elementTop = startRef.current!.getBoundingClientRect().top;
            window.scrollBy({ top: elementTop - 300, behavior: "smooth" });
        }, 0);

        if (org_id) {
            (async () => {
                const fetchedData = await getOtherProfilesOrganizations(org_id);
                const token = localStorage.getItem('token');
                const isFavorite = !!token && (await isFavoriteExecutor(org_id, token))?.data?.status || false;
                setData({
                    ...fetchedData,
                    isFavorite
                });
            })();
        }
    }, [org_id]);

    return (
        <div className={`container ${styles.container}`} ref={startRef}>
            {
                data ? (
                    'msg' in data ?
                        <>
                            <p className={styles.errorMessage}>{data.msg}</p>
                            <Link className={styles.link} to="/find-executor">перейти к списку исполнителей</Link>
                        </>
                        :
                        <>
                            <Info
                                isFavorite={data.isFavorite}
                                favoriteExecutorsHandler={favoriteExecutorsHandler}
                                orgId={data.org.id}
                                status={'executor' in data ? 'executor' : 'orderer'}
                                img={data.org.avatar}
                                brand={data.org.brand_name}
                                name={data.org.short_name}
                                inn={data.org.inn}
                            />
                            {'orderer' in data ? (
                                !!data.orderer.description && <Description text={data.orderer.description} />
                            ) : (
                                !!data.executor.description && <Description text={data.executor.description} />
                            )}
                            {'orderer' in data ? (
                                !!data.orderer.locations.length && <Locations status="orderer" locations={data.orderer.locations} />
                            ) : (
                                !!data.executor.locations.length && <Locations status="executor" locations={data.executor.locations} />
                            )}
                            {'executor' in data && (<>
                                {!!data.executor.services.length && <Services services={data.executor.services} />}
                                {!!data.executor.objects.length && <Objects objects={data.executor.objects} />}
                                {!!data.executor.portfolio.length && <Portfolio portfolio={data.executor.portfolio} />}
                            </>)}
                        </>
                ) : <p className={styles.spinner}>🌀</p>
            }
        </div>
    );
};

export default OrganizationProfilePage;
