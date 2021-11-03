window.addEventListener('DOMContentLoaded', function () {
    calc({
        damageInput: '.AttackDamage',
        getAbilityLevel: '.abilityLevel',
        getTarget: '.target',
        showResult: '.result',
        showResultRift: '.resultRift',
        showBeforeArmorResult: '.beforeArmor',
        getSpears: '.spearAmount',
        getDragons: '.dragonArmor',
        dragsResult: '.dragonsResult',
        championResult: '.championResult'
    });
});


function calc({
    damageInput,
    getAbilityLevel,
    getTarget,
    showResult,
    showResultRift,
    showBeforeArmorResult,
    getSpears,
    getDragons,
    dragsResult,
    championResult
}) {
    let damageValue = document.querySelector(damageInput),
        selectAbilityLevel = document.querySelector(getAbilityLevel),
        selectTarget = document.querySelector(getTarget),
        result = document.querySelector(showResult),
        resultRift = document.querySelector(showResultRift),
        beforeArmorResult = document.querySelector(showBeforeArmorResult),
        spears = document.querySelector(getSpears),
        dragons = document.querySelector(getDragons),
        dragonsResult = document.querySelector(dragsResult),
        champResult = document.querySelector(championResult),
        damage = { value: 0 },
        dragonsArmor = 0,
        spearAmount = 0,
        abilityLevel = 1,
        beforeArmor,
        dragChampDamage,
        scaleLevel = [
            0.232,
            0.275,
            0.319,
            0.363,
            0.406
        ];
        console.log(scaleLevel[1]);
    class Base {
        constructor(obj, value) {
            this.obj = obj;
            this.value = value;
        }
        action() {
            return this.value = this.obj.value;
        }
    }

    damageValue.addEventListener("keyup", function () {
        damage = new Base(damageValue, damage);
        damage = damage.action();
        calculate();
    })
    spears.addEventListener("keyup", function () {
        spearAmount = spears.value;
        calculate();
    })
    damageValue.addEventListener("change", function () {
        damage = new Base(damageValue, damage);
        damage = damage.action();
        calculate();
    })
    spears.addEventListener("change", function () {
        spearAmount = spears.value;
        calculate();
    })
    selectTarget.addEventListener("change", function () {
        target = selectTarget.value;
        calculate();
    })
    selectAbilityLevel.addEventListener("change", function () {
        abilityLevel = selectAbilityLevel.value;
        calculate();
    })
    dragons.addEventListener("keyup", function () {
        dragonsArmor = dragons.value;
        calculate();
    })
    dragons.addEventListener("change", function () {
        dragonsArmor = dragons.value;
        calculate();
    })

    spears.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8)) {
            if (e.keyCode == 9) {
                return true;
            }
            return false;
        }
    }
    damageValue.onkeydown = function (e) {
        if (!((e.keyCode > 95 && e.keyCode < 106)
            || (e.keyCode > 47 && e.keyCode < 58)
            || e.keyCode == 8)) {
            if (e.keyCode == 9) {
                return true;
            }
            return false;
        }
    }

    function calculate() {
        beforeArmor = ((10 + 10 * abilityLevel + damage * 0.7) + ((spearAmount - 1) * (4 + abilityLevel * 6)) + (spearAmount - 1) * (damage * (scaleLevel[abilityLevel -1])));
        dragChampDamage = ((10 + 10 * abilityLevel + damage * 0.7) + ((spearAmount - 1) * (4 + abilityLevel * 6)) + (spearAmount - 1) * (damage * (scaleLevel[abilityLevel -1])));
        beforeArmorResult.innerHTML = Math.floor(beforeArmor * 0.5);
        result.innerHTML = Math.floor(beforeArmor * 0.5 * 0.45);
        resultRift.innerHTML = Math.floor(beforeArmor * 0.5 * 0.62);
        if (dragonsArmor <= 100 && dragonsArmor >= 0) {
            dragonsResult.innerHTML = Math.floor(dragChampDamage * ((100 - dragonsArmor) / 100) * 0.5);
            champResult.innerHTML = Math.floor(dragChampDamage * ((100 - dragonsArmor) / 100));
        } else {
            dragonsResult.innerHTML = "Error";
            champResult.innerHTML = "Error";
        }
    }

}