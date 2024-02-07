import styles from './home.module.css';
import {
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {isAxiosError} from "axios";
import {TPartner} from '../../types';
import {IApiPartner} from '../../services';
import cn from "classnames";
import {StringParam, useQueryParam} from "use-query-params";
import {useNavigate} from "react-router-dom";
import {debouncedFetch} from "../../utils/pureFunctoin.ts";

function PartnerHomePage() {
  const [partners, setPartners] = useState<TPartner.IEntity.ListItem[]>([{
    CardCode: '1',
    CardName: '1',
    CardType: '1',
    Currency: '1',
    Country: '1',
    Phone1: '1'
  }])
  const [params, setParams] = useState<TPartner.List.Param>({select: null})
  const [cardCode, setCardCode] = useState<TPartner.IEntity.selectParam>(null)
  const [partnerModal, setPartnerModal] = useState(false)
  const [id, setId] = useQueryParam('id', StringParam);


  const fetchPartners = useCallback(async () => {
    debouncedFetch(params, setPartners, IApiPartner.List);
  }, [params])

  useEffect(() => {
    setParams({select: cardCode || null})
  }, [cardCode]);

  useEffect(() => {
    fetchPartners()
  }, [params])

  const selectOptions = useMemo(() => [
    {
      value: '',
      label: 'All'
    },
    {
      value: 'CardCode',
      label: 'Card code'
    },
    {
      value: 'CardName',
      label: 'Card name'
    },
    {
      value: 'CardType',
      label: 'Card type'
    }], [])

  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardCode(e.target.value as TPartner.IEntity.selectParam)
  }, [])

  const handleCreatePartner = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const formDataObject: TPartner.Create.Request = {
      CardCode: '',
      CardName: '',
      CardType: '',
      Phone1: ''
    };

    formData.forEach((value, key) => {
      formDataObject[key as keyof TPartner.IEntity.Form] = value.toString()
    });

    try {
      id ? await IApiPartner.Update(id, formDataObject)
        : await IApiPartner.Create(formDataObject)
    } catch (err) {
      if (isAxiosError(err)) {
        alert('Something went wrong')
      }
    }
  }, [id])

  const handleOpenModal = useCallback(() => {
    setPartnerModal(true)
  }, [])

  const handleCloseModal: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = useCallback((event) => {
    event.stopPropagation();
    setPartnerModal(false)
    setId(undefined)
  }, [])

  const handleStopPropagation: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = useCallback((event) => {
    event.stopPropagation();
  }, [])


  return (
    <div className={styles['home-page']}>
      <h1 className={styles.title}>Partners</h1>
      <div className={styles['top-bar']}>
        <button onClick={handleOpenModal}
                className={styles['partner-add-btn']}>
          + Add Partner
        </button>
        <select onChange={handleSelectChange}>
          {
            selectOptions.map((option, idx) => (
              <option key={idx}
                      value={option.value}>{option.label}</option>))
          }
        </select>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <th>Card Name</th>
            <th>Card Code</th>
            <th>Currency</th>
            <th>Country</th>
            <th>Card Type</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {partners.length ?
            partners.map(partner => (
              <TableRow key={partner.CardCode} partner={partner}
                        setId={(id) => setId(id)}
                        openModal={handleOpenModal}/>
            )) :
            null

          }
          </tbody>
        </table>
        {
          !partners.length && (
            <div className={styles['empty-table']}>
              <h4>Not Data</h4>
            </div>
          )
        }
      </div>
      {partnerModal && <div className={cn(styles['modal-container'])}
                            onClick={handleCloseModal}>
          <div onClick={handleStopPropagation}
               className={cn(styles['modal'])}>
              <h2>Create Partner</h2>
              <form onSubmit={handleCreatePartner}>
                  <div className={styles['input-box']}>
                      <label htmlFor="CardName">Card Name</label>
                      <input type="text" id="CardName"
                             name="CardName"/>
                  </div>
                  <div className={styles['input-box']}>
                      <label htmlFor="CardType">Card Type</label>
                      <input type="text" id="CardType"
                             name="CardType"/>
                  </div>
                  <div className={styles['input-box']}>
                      <label htmlFor="CardCode">Card Code</label>
                      <input type="text" id="CardCode"
                             name="CardCode"/>
                  </div>
                  <div className={styles['input-box']}>
                      <label htmlFor="Phone1">Phone Number</label>
                      <input type="text" id="Phone1" name="Phone1"/>
                  </div>

                  <button type='button' onClick={handleCloseModal}
                          className={styles['partner-cancel-btn']}>Cancel
                  </button>
                  <button className={styles['partner-create-btn']}
                          type='submit'>Create
                  </button>
              </form>
          </div>
      </div>}
    </div>
  )
}

const TableRow = memo(function ({partner, openModal, setId}: {
  partner: TPartner.IEntity.ListItem
  openModal: () => void
  setId: (id: string) => void
}) {
  const router = useNavigate()


  const handleDeletePartner = useCallback(async (id: string) => {
    try {
      const data = await IApiPartner.Delete(id)
    } catch (err) {
      if (isAxiosError(err)) {
        alert('Something went wrong')
      }
    }
  }, [])

  return (
    <tr>
      <td>{partner.CardName}</td>
      <td>{partner.CardCode}</td>
      <td>{partner.Currency}</td>
      <td>{partner.Country}</td>
      <td>{partner.CardType}</td>
      <td>
        <div className={styles['action-container']}>
          <button className={styles['see-btn']} onClick={() => {
            router(`/partner/${partner.CardCode}`)
          }}>see
          </button>
          <button className={styles['edit-btn']} onClick={() => {
            openModal();
            setId(partner.CardCode)
          }}>Edit
          </button>
          <button className={styles['delete-btn']}
                  onClick={() => handleDeletePartner(partner.CardCode)}>Delete
          </button>
        </div>
      </td>
    </tr>
  )
})

export default PartnerHomePage;
