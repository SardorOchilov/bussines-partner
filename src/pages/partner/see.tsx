import {IApiPartner} from "../../services";
import {TPartner} from "../../types";
import styles from "./see.module.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {debouncedFetch} from "../../utils/pureFunctoin.ts";


function SeePartnerPage() {
  const [partnerDate, setPartnerDate] = useState<TPartner.IEntity.ListItem | null>(null)
  const {id} = useParams();


  useEffect(() => {
    try {
      if (id) {
        debouncedFetch(id, setPartnerDate, IApiPartner.Single);
      }
    } catch (err) {

    }
  }, []);

  return <div className={styles['see-page']}>
    <h1 className={styles.title}>See Page</h1>
    <div className={styles['infos']}>
      <p className={styles.label}>Card Name</p>
      <p>{partnerDate?.CardName || '___'}</p>
      <p className={styles.label}>Card Code</p>
      <p>{partnerDate?.CardCode || '___'}</p>
      <p className={styles.label}>Card Type</p>
      <p>{partnerDate?.CardType || '___'}</p>
      <p className={styles.label}>Phone Number</p>
      <p>{partnerDate?.Phone1 || '___'}</p>
    </div>
  </div>;
}

export default SeePartnerPage;
