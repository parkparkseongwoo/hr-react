import { ReactElement, useState } from 'react';

// project imports
import Layout from 'layout';
import Page1 from './HobongTable';
import Page2 from './PositionTable';
import styles from 'styles/Home.module.css';
import HobongRegisterModal from './HobongRegisterModal';
import HobongIncreaseModal from './HobongIncreaseModal';
import {Button, Grid, Stack, TextField } from '@mui/material';
import { hobongAction } from 'store/redux-saga/reducer/base/hobongReducer';
import { dispatch } from 'store';


const HobongRegisterMainPage = () => {
  
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [increaseModal, setIncreaseModal] = useState<boolean>(false);

  const [handleApply, setHandleApply] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [positionCode, setPositionCode] = useState<string>('');

  //적용시작일
  const [applyDate, setApplyDate] = useState<string>('');
  //적용종료일
  const [applyEndDate, setApplyEndDate] = useState<string>('');

  const handleRowClick = (positionCode: string) => {
    setPositionCode(positionCode);
  };

  const onToggleRegisterHandler = () => {
    setRegisterModal((data) => !data);
    //dispatch(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(positionCode));
  };

  const onToggleIncreaseHandler = () => {
    setIncreaseModal((data) => !data);
    //dispatch(hobongAction.HOBONG_LIST_SEARCH_FETCH_REQUESTED(positionCode));
  };

  const onHobongRegisterHandler = () => {
    if(positionCode === undefined){
      alert("직급을 먼저 선택해주세요.");
    }else if(applyDate === '' || applyEndDate === ''){
      alert("적용시작일과 적용종료일을 먼저 선택해주세요.");
    }else{
      setRegisterModal(true);
    }
  };

  const onHobongIncreaseHandler = () => {
    if(positionCode === undefined){
      alert("직급을 먼저 선택해주세요.");
    }else if(applyDate === '' || applyEndDate === ''){
      alert("적용시작일과 적용종료일을 먼저 선택해주세요.");
    }else{
      setIncreaseModal(true);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: 'lightgray', padding: '10px' }}>
        <Stack direction="row" spacing={2} alignItems="center">
        {registerModal && <HobongRegisterModal toggle={onToggleRegisterHandler} setHandleApply={setHandleApply} positionCode={positionCode} applyDate={applyDate} applyEndDate={applyEndDate}/>}
          <Button variant="contained" color="primary" onClick={() => onHobongRegisterHandler()}>
            일괄등록
          </Button>
          

          {increaseModal && <HobongIncreaseModal toggle={onToggleIncreaseHandler} positionCode={positionCode} applyDate={applyDate} applyEndDate={applyEndDate}/>}
          <Button variant="contained" color="primary" onClick={() => onHobongIncreaseHandler()}>
            일괄인상
          </Button>

          <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="적용시작연월"
                    name="적용시작연월"
                    type={'date'}
                    onChange={(event: any) => {
                      setApplyDate(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="적용종료연월"
                    name="적용종료연월"
                    type={'date'}
                    onChange={(event) => {
                      setApplyEndDate(event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
        </Stack>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, }}>
          <div className={styles['page-wrapper']}>
            <Page2 onRowClick={handleRowClick} />
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <div className={styles['page-wrapper']}>
            <Page1 positionCode={positionCode} />
          </div>
        </div>
      </div>
      
    </div>
);
}
HobongRegisterMainPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default HobongRegisterMainPage;
