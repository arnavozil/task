import s from './Add.module.scss';
import Warning from '../../widgets/Warning/Warning';
import mountain from '../../assets/mountain.jpg';
import { LoadingDots } from '../../widgets/Loader/Loader';
import TextInput, { TextArea } from '../../widgets/Input/Input';
import CheckBoxes from '../../widgets/Box/Box';
import { readURI } from '../../utils';
const AddUI = ({
    data, setter, canSubmit = true,
    submitForm = () => {}, error = '',
    positive = false,
}) => {
    return <form onSubmit={submitForm} className={s.card_data}>
        <Warning className={positive ? s.positive : ''} text={error} />
        <div className={s.card_data_left}>
            <TextInput 
                placeholder='Todo Title'
                containerClassName={s.card_input}
                value={data.title} uid='todotitle'
                onChange={e => (setter(d => ({ ...d, title: e })))}
            />
            <TextArea 
                placeholder='Todo Description'
                containerClassName={s.card_input}
                value={data.body} uid='todobody'
                onChange={e => (setter(d => ({ ...d, body: e })))}
            />
            <CheckBoxes 
                format={
                    [
                        { checked: data.priority === 'low', color: '#f04', text: 'Low', onClick: () => setter(d => ({ ...d, priority: 'low' })) },
                        { checked: data.priority === 'moderate', color: '#f48c06', text: 'Moderate', onClick: () => setter(d => ({ ...d, priority: 'moderate' })) },
                        { checked: data.priority === 'high', color: '#3a3', text: 'High', onClick: () => setter(d => ({ ...d, priority: 'high' })) }
                    ]
                }
            />
        </div>
        <div className={s.card_data_right}>
            <TextInput 
                containerClassName={s.card_input}
                placeholder='Todo Expires In...'
                type='number' value={data.expiresIn} uid='expiresIn'
                onChange={e => setter(d => ({ ...d, expiresIn: e }))}
            />
            <CheckBoxes 
                format={
                    [
                        {checked: data.unit === 'hour', text: 'Hours', onClick: () => setter(d => ({ ...d, unit: 'hour' }))},
                        {checked: data.unit === 'day', text: 'Days', onClick: () => setter(d => ({ ...d, unit: 'day' }))},
                        {checked: data.unit === 'month', text: 'Months', onClick: () => setter(d => ({ ...d, unit: 'month' }))},
                        {checked: data.unit === 'year', text: 'Years', onClick: () => setter(d => ({ ...d, unit: 'year' }))},
                    ]
                }
            />
            <label className={s.card_data_right_label}>
            <label className={s.card_data_right_label}>
                <input 
                    type='file' className={s.card_data_right_label_input}
                    onChange={e => {
                        const { files, value } = e.target;
                        readURI(e, arr => setter(d => ({ ...d, imageArr: arr })));
                        setter(d => ({ ...d, file: files, fileName: value }))
                    }}
                />
                <div className={s.card_data_right_label_image}>
                    <img 
                        src={mountain} alt='New Building Input' 
                        className={s.card_data_right_label_image_img}  
                    />
                </div>
                <div className={s.card_data_right_label_box}>
                    <h2>Add Document</h2>
                    <p>Single Document (Optional)</p>
                </div>
                {data.imageArr?.length ? <div className={s.card_data_right_label_grid}>
                    {
                        data.imageArr.map((uri, i) => <img 
                            alt='Todo Doc Upload' src={uri}
                            className={s.card_data_right_label_grid_item}
                            key={uri}
                        />)
                    }
                </div> : <></>}
            </label>
            </label>
            <div className={s.card_data_right_button}>
                <input
                    type='submit' value={canSubmit ? 'Add Todo' : ''} onClick={submitForm}
                    className={[s.card_data_right_button_input, canSubmit ? '' : s.inactive].join(' ')}
                />
                    {!canSubmit ? <LoadingDots 
                        className={s.loading}
                    /> : <></>}
            </div>
        </div>
    </form>
};

export default AddUI;