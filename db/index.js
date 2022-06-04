import StartFirebase from "./Configuration";
import { set, ref, get, remove, child } from "firebase/database";

const fdb = StartFirebase();

export const insertAlert = (model) => {
  var id = uuidv4();
  console.log("ID: " + id)
  model.id = id;
  model.date = new Date().getTime();
  console.log(model)
  const promise = set(ref(fdb, "visualizations/" + id), model);

  return promise;
};

export const fetchAlerts = () => {
  const dbref = ref(fdb);
  const promise = get(child(dbref, "visualizations"));

  return promise;
};

export const findAlert = (id) => {
  const dbref = ref(fdb);
  const promise = get(child(dbref, "visualizations/" + id));

  return promise;
};

export const deleteAlert = (id) => {
  const promise = remove(ref(fdb, "visualizations/" + id));

  return promise;
};

function uuidv4() {
  var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
