import request from '@/utils/request';

// 찜한 식당정보 list.
export function getFavoriteList(data) {
  return request({
    url: '/cafeteria/favorite/list',
    method: 'get',
    data,
  });
}
