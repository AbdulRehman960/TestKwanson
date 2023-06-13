import SQLite from 'react-native-sqlite-storage';
import Snackbar from 'react-native-snackbar';
var db=SQLite.openDatabase("kwansoTest.db", "1.0", "Test Database", 200000);
export default db
export const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });
  

  export const insertData = async (DATA,onSuccess) => {
    let singleInsert = await ExecuteQuery("INSERT INTO tbl_kwanso (isCompleted,items) VALUES (?,?)", [0, JSON.stringify(DATA)]);
    console.log(singleInsert);
    Snackbar.show({
      text: 'Record added Successfully!!!!',
      duration: Snackbar.LENGTH_SHORT,
    });
    onSuccess()
   
  }

  export  const updateData = async (DATA,id,onSuccess) => {
    let singleInsert = await ExecuteQuery("UPDATE tbl_kwanso SET items = ?  WHERE id = ?", [JSON.stringify(DATA),id]);
    console.log(singleInsert);
    Snackbar.show({
      text: 'Record updated Successfully!!!!',
      duration: Snackbar.LENGTH_SHORT,
    });
    onSuccess()
  }
  export  const markComplete = async (completed,id,onSuccess) => {
    let singleInsert = await ExecuteQuery("UPDATE tbl_kwanso SET isCompleted = ?  WHERE id = ?", [completed,id]);
    Snackbar.show({
      text: 'Marked Completed Successfully!!!!',
      duration: Snackbar.LENGTH_SHORT,
    });
    onSuccess()
  }
  export  const deleteData = async (id,onSuccess) => {
    let singleInsert = await ExecuteQuery("DELETE FROM tbl_kwanso WHERE id = ?", [id]);
    Snackbar.show({
      text: 'Deleted Successfully!!!!',
      duration: Snackbar.LENGTH_SHORT,
    });
    onSuccess()
  }