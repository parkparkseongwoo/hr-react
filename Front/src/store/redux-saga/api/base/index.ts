import hrApi from '../intercepter';

const AUTHLIST_URL = 'base/authLevel';
const DETAIL_CODE_URL = 'base/detailCode';
const HOBONG_URL = 'foudinfomgmt/hobonglist';
const HOBONG_UPDATE_BY_PERCENTAGE_URL = 'foudinfomgmt/hobong_percentage';
const HOBONG_UPDATE_BY_FIXED_URL = 'foudinfomgmt/hobong_fixed';


// 권한 조회
export const getAuthList = async () => {
  try {
    return await hrApi.get(AUTHLIST_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 코드 조회
export const getCodeList = async () => {
  try {
    return await hrApi.get(DETAIL_CODE_URL, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 조회
export const getHobongList = async (param: string) => {
  try {
    return await hrApi.get(HOBONG_URL, {
      params: {
        token: localStorage.getItem('access'),
        positionCode: param
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 등록
export const insertHobongList = async (body: any) => {
  try {
    return await hrApi.post(HOBONG_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 정률 인상
export const updatePercentageHobongList = async (body: any) => {
  try {
    return await hrApi.put(HOBONG_UPDATE_BY_PERCENTAGE_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

// 호봉 정액 인상
export const updateFixedHobongList = async (body: any) => {
  try {
    return await hrApi.put(HOBONG_UPDATE_BY_FIXED_URL, body, {
      params: {
        token: localStorage.getItem('access')
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

