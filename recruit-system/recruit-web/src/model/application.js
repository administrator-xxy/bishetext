import {
  get,
  post,
  put,
  _delete
} from '@/lin/plugin/axios'
class Application {
  static async create(data) {
    const res = await post('recruit/application', data)
    return res
  }

  static async getByHrId(hrID, state) {
    const res = await get(`recruit/application/page/${hrID}`, {
      state: state
    })
    return res
  }

  static async updateState(id, state) {
    const res = await put(`recruit/application/state/${id}?state=${state}`)
    return res
  }

  static async delete(id) {
    const res = await _delete(`recruit/application/${id}`)
    return res
  }

  static async sortByGrade(hrID) {
    const res = await get(`recruit/application/sort/${hrID}`)
    return res
  }

  static async getByPositionIdAndUserId(positionId, userId) {
    const res = await get('recruit/application', {
      positionId: positionId,
      userId: userId
    })
    return res
  }

  static async getByUserId(userId, count, page) {
    const res = await get(`recruit/application/page/find/${userId}`, {
      userId: userId,
      count: count,
      page: page,
    })
    return res
  }
}

export {
  Application
}
