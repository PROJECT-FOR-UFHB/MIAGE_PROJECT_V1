import apiClient from './apiClient'

const rootName = 'backups';

const dbService = {

  /**
   * Renvoie la liste des sauvegardes
   * @returns {Promise} - Promesse avec la liste des sauvegardes en JSON
   */
  getBackups() {
    return apiClient.get(`/${rootName}`)
  },

  createBackup() {
    return apiClient.post(`/${rootName}`)
  },

  downloadBackup(backupName) {
    return apiClient.get(`/${rootName}/${backupName}/download`,
       {
        responseType: 'blob'
      })
  },

  deleteBackup(backupName) {
    return apiClient.delete(`/${rootName}/${backupName}`);

  }

}

export default dbService;
