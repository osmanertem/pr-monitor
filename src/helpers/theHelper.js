const LOGIN_NAME_MAP = {
  acsly: "Ahmet Can",
  ahmetceylan: "Ahmet Ceylan",
  AlicanBayir: "Alican",
  alpaykuru: "Alpay",
  aylino: "Aylin",
  brendtumi: "Tümay",
  efegure: "Efe",
  ercang: "Ercan",
  masha: "esracagşar",
  hakansakalli: "Hakan Sakallı",
  iremdamla: "İrem",
  legionairre: "Güçlü",
  mchtctn: "Mücahit",
  mkapi: "Metin",
  mylmz10: "Muammer",
  osmanertem: "Osman",
  ozanbatuhanceylan: "Ozan",
  oznurbayram: "Öznur",
  saricaahmet: "Ahmet Sarıca",
  Serhatkemal: "Serhat",
  temelt: "Taner",
  theutku: "Utku",
  volkanakbayir: "Volkan",
  wwdd1: "Mehmet Çetin",
  yasinvural: "Yasin Vural",
  yerol: "Yiğit",
  zhunor: "Orhun"
};

const MIN_REQUIRED_APPROVER_COUNT = 3;

const APPROVER_LIST = ["ercang", "ahmetceylan", "osmanertem", "mylmz10", "yerol"];

export function getNameFromLogin(login) {
  return LOGIN_NAME_MAP[login] ? LOGIN_NAME_MAP[login] : login;
}

export function didPRGetRequiredApproveCount(approverList) {
  return (
    approverList.filter(currentApprover => {
      return (
        APPROVER_LIST.filter(testApprover => {
          return testApprover === currentApprover.login;
        }).length > 0
      );
    }).length >= MIN_REQUIRED_APPROVER_COUNT
  );
}
