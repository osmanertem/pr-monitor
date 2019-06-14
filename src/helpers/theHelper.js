const USERS = [
  { login: "acsly", name: "Ahmet Can", role: "SW" },
  { login: "ahmetceylan", name: "Ahmet Ceylan", role: "SW" },
  { login: "AlicanBayir", name: "Alican", role: "SW" },
  { login: "alpaykuru", name: "Alpay", role: "SW" },
  { login: "aylino", name: "Gökçe", role: "QA" },
  { login: "brendtumi", name: "Tümay", role: "SW" },
  { login: "efegure", name: "Efe", role: "SW" },
  { login: "ercang", name: "Ercan", role: "SW" },
  { login: "esracaglar", name: "Esra", role: "QA" },
  { login: "hakansakalli", name: "Hakan Sakallı", role: "QA" },
  { login: "iremdamla", name: "İrem", role: "QA" },
  { login: "legionairre", name: "Güçlü", role: "SW" },
  { login: "mchtctn", name: "Mücahit", role: "QA" },
  { login: "mkapi", name: "Metin", role: "SW" },
  { login: "mylmz10", name: "Muammer", role: "SW" },
  { login: "osmanertem", name: "Osman", role: "SW" },
  { login: "ozanbatuhanceylan", name: "Ozan", role: "SW" },
  { login: "oznurbayram", name: "Öznur", role: "SW" },
  { login: "saricaahmet", name: "Ahmet Sarıca", role: "SW" },
  { login: "Serhatkemal", name: "Serhat", role: "SW" },
  { login: "temelt", name: "Taner", role: "SW" },
  { login: "theutku", name: "Utku", role: "SW" },
  { login: "volkanakbayir", name: "Volkan", role: "SW" },
  { login: "wwdd1", name: "Mehmet", role: "SW" },
  { login: "yasinvural", name: "Yasin", role: "SW" },
  { login: "yerol", name: "Yiğit", role: "SW" },
  { login: "zhunor", name: "Orhun", role: "SW" },
  { login: "hcatana", name: "Hakan Çatana", role: "QA" }
];

const MIN_REQUIRED_APPROVER_COUNT = 2;

export function getUserWithLogin(login) {
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].login === login) {
      return USERS[i];
    }
  }

  return { login: login, name: login, role: "SW" };
}

export function didPRGetRequiredApproveCount(approverList) {
  return approverList.length >= MIN_REQUIRED_APPROVER_COUNT ;

  // return (
  //   approverList.filter(currentApprover => {
  //     return (
  //       APPROVER_LIST.filter(testApprover => {
  //         return testApprover === currentApprover.login;
  //       }).length > 0
  //     );
  //   }).length >= MIN_REQUIRED_APPROVER_COUNT
  // );
}
