export function formatDate(date, fmt) {
  if (!date) {
    return '-'
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function initData() {
  return {
    'patientDto': {
      'curMedicalRecord': {
        'currentText': '',
        'DMcomplications': {
          'list': []
        },
        'confirmTime': {
          'time': ''
        },
        'CKDreason': {
          'list': []
        },
        'Westernmedicine': {
          'list': []
        }
      },
      'engravedDisease': null,
      'pastHistoryList': [],
      'personalHistory': {
        'whiteWine': {
          'amount': 0,
          'dropYear': 0,
          'drinkYear': 0,
          'dropDrink': false
        },
        'smoke': {
          'amount': 0,
          'dropYear': 0,
          'dropSmoke': false,
          'smokeYear': 0
        },
        'beer': {
          'amount': 0
        }
      },
      'familyHistoryList': null,
      'allergyHistory': '{}'
    },
    'consultationDto': {
      'medicalLoc': {},
      'additionalInfo': null,
      'symptom': {
        'symtomOther': '',
        'symtomOther2': '',
        'symtomList3': [],
        'symtomList2': [],
        'symtomList': []
      },
      'prescription': JSON.stringify({
        tiaohu: '',
        prescriptions: [],
        mark: {
          value: '',
          type: ''
        }
      }),
      'symptomCategories': {
        'real': [],
        'empty': []
      },
      'otherDiagnosisId': null,
      'diseaseLocation': {
        'meridian': [],
        'tripleFocus': [],
        'viscera': [],
        'defender': []
      },
      'vasScore': {
        'worstSymptom': '',
        'degree': 0,
        'DM': [],
        'healthyStatus': 0,
        'lifeQuality': 0,
        'CKD': []
      },
      'windEvil': {
        'diagnosticResult': '',
        'fengxie': []
      }
    }
  }
}
