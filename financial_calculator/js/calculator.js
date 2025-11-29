// 金融计算器核心功能

// 工具函数：格式化数字
function formatNumber(num, decimals = 2) {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 工具函数：格式化货币
function formatCurrency(num, decimals = 2) {
    return '¥' + formatNumber(num, decimals);
}

// 工具函数：显示结果
function showResult(elementId, content) {
    const element = document.getElementById(elementId);
    element.innerHTML = content;
    element.classList.add('show');
}

// 工具函数：解析现金流字符串
function parseCashFlows(str) {
    return str.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
}

// ========== 时间价值计算 ==========

// 现值计算 (PV)
function calculatePV() {
    const fv = parseFloat(document.getElementById('pv-fv').value);
    const r = parseFloat(document.getElementById('pv-r').value) / 100;
    const n = parseFloat(document.getElementById('pv-n').value);

    if (isNaN(fv) || isNaN(r) || isNaN(n)) {
        alert('请输入所有必需的值！');
        return;
    }

    const pv = fv / Math.pow(1 + r, n);

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(pv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>未来价值:</span>
                <span>${formatCurrency(fv)}</span>
            </div>
            <div class="detail-item">
                <span>利率:</span>
                <span>${(r * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>期数:</span>
                <span>${n}</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            如果在${n}期后要获得${formatCurrency(fv)}，在年利率${(r * 100).toFixed(2)}%的情况下，现在需要投资${formatCurrency(pv)}。
        </div>
    `;

    showResult('pv-result', result);
}

// 终值计算 (FV)
function calculateFV() {
    const pv = parseFloat(document.getElementById('fv-pv').value);
    const r = parseFloat(document.getElementById('fv-r').value) / 100;
    const n = parseFloat(document.getElementById('fv-n').value);

    if (isNaN(pv) || isNaN(r) || isNaN(n)) {
        alert('请输入所有必需的值！');
        return;
    }

    const fv = pv * Math.pow(1 + r, n);

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(fv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>现值:</span>
                <span>${formatCurrency(pv)}</span>
            </div>
            <div class="detail-item">
                <span>利率:</span>
                <span>${(r * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>期数:</span>
                <span>${n}</span>
            </div>
            <div class="detail-item">
                <span>总增长:</span>
                <span>${formatCurrency(fv - pv)}</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            投资${formatCurrency(pv)}，在年利率${(r * 100).toFixed(2)}%的情况下，${n}期后将增长到${formatCurrency(fv)}。
        </div>
    `;

    showResult('fv-result', result);
}

// 永续年金计算 (Perpetuity)
function calculatePerpetuity() {
    const c = parseFloat(document.getElementById('perp-c').value);
    const r = parseFloat(document.getElementById('perp-r').value) / 100;

    if (isNaN(c) || isNaN(r) || r === 0) {
        alert('请输入所有必需的值！');
        return;
    }

    const pv = c / r;

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(pv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>每期现金流:</span>
                <span>${formatCurrency(c)}</span>
            </div>
            <div class="detail-item">
                <span>折现率:</span>
                <span>${(r * 100).toFixed(2)}%</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            每期获得${formatCurrency(c)}的永续现金流，在折现率${(r * 100).toFixed(2)}%下，其现值为${formatCurrency(pv)}。
        </div>
    `;

    showResult('perp-result', result);
}

// 普通年金计算 (Annuity)
function calculateAnnuity() {
    const c = parseFloat(document.getElementById('ann-c').value);
    const r = parseFloat(document.getElementById('ann-r').value) / 100;
    const n = parseFloat(document.getElementById('ann-n').value);

    if (isNaN(c) || isNaN(r) || isNaN(n)) {
        alert('请输入所有必需的值！');
        return;
    }

    const pv = c * (1 - Math.pow(1 + r, -n)) / r;
    const totalCashFlow = c * n;

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(pv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>每期现金流:</span>
                <span>${formatCurrency(c)}</span>
            </div>
            <div class="detail-item">
                <span>利率:</span>
                <span>${(r * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>期数:</span>
                <span>${n}</span>
            </div>
            <div class="detail-item">
                <span>总现金流:</span>
                <span>${formatCurrency(totalCashFlow)}</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            ${n}期内每期期末获得${formatCurrency(c)}，在利率${(r * 100).toFixed(2)}%下，现值为${formatCurrency(pv)}。
        </div>
    `;

    showResult('ann-result', result);
}

// 预付年金计算 (Annuity Due)
function calculateAnnuityDue() {
    const c = parseFloat(document.getElementById('anndue-c').value);
    const r = parseFloat(document.getElementById('anndue-r').value) / 100;
    const n = parseFloat(document.getElementById('anndue-n').value);

    if (isNaN(c) || isNaN(r) || isNaN(n)) {
        alert('请输入所有必需的值！');
        return;
    }

    const pv = c * (1 - Math.pow(1 + r, -n)) / r * (1 + r);
    const totalCashFlow = c * n;

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(pv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>每期现金流:</span>
                <span>${formatCurrency(c)}</span>
            </div>
            <div class="detail-item">
                <span>利率:</span>
                <span>${(r * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>期数:</span>
                <span>${n}</span>
            </div>
            <div class="detail-item">
                <span>总现金流:</span>
                <span>${formatCurrency(totalCashFlow)}</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            ${n}期内每期期初获得${formatCurrency(c)}，在利率${(r * 100).toFixed(2)}%下，现值为${formatCurrency(pv)}。预付年金比普通年金多一期利息。
        </div>
    `;

    showResult('anndue-result', result);
}

// ========== 债券定价 ==========

// 债券价格计算
function calculateBondPrice() {
    const faceValue = parseFloat(document.getElementById('bond-fv').value);
    const couponRate = parseFloat(document.getElementById('bond-coupon').value) / 100;
    const ytm = parseFloat(document.getElementById('bond-ytm').value) / 100;
    const years = parseFloat(document.getElementById('bond-years').value);
    const frequency = parseFloat(document.getElementById('bond-freq').value);

    if (isNaN(faceValue) || isNaN(couponRate) || isNaN(ytm) || isNaN(years)) {
        alert('请输入所有必需的值！');
        return;
    }

    const totalPeriods = years * frequency;
    const couponPayment = (faceValue * couponRate) / frequency;
    const periodYTM = ytm / frequency;

    // 计算债券价格
    let pvCoupons = 0;
    for (let t = 1; t <= totalPeriods; t++) {
        pvCoupons += couponPayment / Math.pow(1 + periodYTM, t);
    }

    const pvFaceValue = faceValue / Math.pow(1 + periodYTM, totalPeriods);
    const bondPrice = pvCoupons + pvFaceValue;

    // 判断债券类型
    let bondType = '';
    let bondTypeClass = '';
    if (bondPrice > faceValue) {
        bondType = '溢价债券 (Premium Bond)';
        bondTypeClass = 'positive';
    } else if (bondPrice < faceValue) {
        bondType = '折价债券 (Discount Bond)';
        bondTypeClass = 'negative';
    } else {
        bondType = '平价债券 (Par Bond)';
        bondTypeClass = 'neutral';
    }

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${formatCurrency(bondPrice)}</div>
        <div class="details">
            <div class="detail-item">
                <span>面值:</span>
                <span>${formatCurrency(faceValue)}</span>
            </div>
            <div class="detail-item">
                <span>票面利率:</span>
                <span>${(couponRate * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>到期收益率:</span>
                <span>${(ytm * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>每期付息:</span>
                <span>${formatCurrency(couponPayment)}</span>
            </div>
            <div class="detail-item">
                <span>总期数:</span>
                <span>${totalPeriods}</span>
            </div>
            <div class="detail-item">
                <span>债券类型:</span>
                <span><strong>${bondType}</strong></span>
            </div>
        </div>
        <div class="interpretation ${bondTypeClass}">
            <i class="fas fa-info-circle"></i> 
            ${bondPrice > faceValue ? 
                `债券当前价格高于面值，因为票面利率(${(couponRate * 100).toFixed(2)}%)高于市场收益率(${(ytm * 100).toFixed(2)}%)。` :
                bondPrice < faceValue ?
                `债券当前价格低于面值，因为票面利率(${(couponRate * 100).toFixed(2)}%)低于市场收益率(${(ytm * 100).toFixed(2)}%)。` :
                `债券以面值交易，票面利率等于市场收益率。`
            }
        </div>
    `;

    showResult('bond-result', result);
}

// ========== 投资项目评估 ==========

// NPV计算
function calculateNPV() {
    const initial = parseFloat(document.getElementById('npv-initial').value);
    const rate = parseFloat(document.getElementById('npv-rate').value) / 100;
    const cashflowsStr = document.getElementById('npv-cashflows').value;

    if (isNaN(initial) || isNaN(rate) || !cashflowsStr) {
        alert('请输入所有必需的值！');
        return;
    }

    const cashflows = parseCashFlows(cashflowsStr);
    
    if (cashflows.length === 0) {
        alert('请输入有效的现金流！');
        return;
    }

    // 计算NPV
    let npv = -initial;
    let pvDetails = [];
    
    cashflows.forEach((cf, index) => {
        const t = index + 1;
        const pv = cf / Math.pow(1 + rate, t);
        npv += pv;
        pvDetails.push({
            period: t,
            cashflow: cf,
            pv: pv
        });
    });

    const totalCashflow = cashflows.reduce((a, b) => a + b, 0);
    const decision = npv > 0 ? '接受' : npv < 0 ? '拒绝' : '中性';
    const decisionClass = npv > 0 ? 'positive' : npv < 0 ? 'negative' : 'neutral';

    let detailsHTML = pvDetails.map(d => `
        <div class="detail-item">
            <span>第${d.period}期现金流:</span>
            <span>${formatCurrency(d.cashflow)} → PV: ${formatCurrency(d.pv)}</span>
        </div>
    `).join('');

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value ${npv < 0 ? 'negative' : ''}">${formatCurrency(npv)}</div>
        <div class="details">
            <div class="detail-item">
                <span>初始投资:</span>
                <span>${formatCurrency(initial)}</span>
            </div>
            <div class="detail-item">
                <span>折现率:</span>
                <span>${(rate * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>总现金流:</span>
                <span>${formatCurrency(totalCashflow)}</span>
            </div>
            ${detailsHTML}
            <div class="detail-item">
                <span><strong>投资决策:</strong></span>
                <span><strong>${decision}</strong></span>
            </div>
        </div>
        <div class="interpretation ${decisionClass}">
            <i class="fas fa-info-circle"></i> 
            ${npv > 0 ? 
                `NPV为正值，表示项目预期能创造${formatCurrency(npv)}的价值，建议接受该项目。` :
                npv < 0 ?
                `NPV为负值，表示项目将损失${formatCurrency(Math.abs(npv))}的价值，建议拒绝该项目。` :
                `NPV为零，项目刚好达到盈亏平衡，决策中性。`
            }
        </div>
    `;

    showResult('npv-result', result);
}

// IRR计算（牛顿迭代法）
function calculateIRR() {
    const initial = parseFloat(document.getElementById('irr-initial').value);
    const cashflowsStr = document.getElementById('irr-cashflows').value;

    if (isNaN(initial) || !cashflowsStr) {
        alert('请输入所有必需的值！');
        return;
    }

    const cashflows = [initial].concat(parseCashFlows(cashflowsStr));
    
    if (cashflows.length < 2) {
        alert('请至少输入一期现金流！');
        return;
    }

    // 使用牛顿迭代法计算IRR
    function npvAtRate(rate, cfs) {
        return cfs.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
    }

    function npvDerivative(rate, cfs) {
        return cfs.reduce((sum, cf, t) => sum - t * cf / Math.pow(1 + rate, t + 1), 0);
    }

    let irr = 0.1; // 初始猜测值
    let iteration = 0;
    const maxIterations = 100;
    const tolerance = 0.00001;

    while (iteration < maxIterations) {
        const npv = npvAtRate(irr, cashflows);
        const derivative = npvDerivative(irr, cashflows);
        
        if (Math.abs(npv) < tolerance) break;
        
        irr = irr - npv / derivative;
        iteration++;
    }

    if (iteration >= maxIterations) {
        alert('无法计算IRR，请检查现金流数据！');
        return;
    }

    const totalCashIn = cashflows.slice(1).filter(cf => cf > 0).reduce((a, b) => a + b, 0);
    const decision = irr > 0 ? '可行' : '不可行';
    const decisionClass = irr > 0 ? 'positive' : 'negative';

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${(irr * 100).toFixed(2)}%</div>
        <div class="details">
            <div class="detail-item">
                <span>初始投资:</span>
                <span>${formatCurrency(initial)}</span>
            </div>
            <div class="detail-item">
                <span>现金流入总计:</span>
                <span>${formatCurrency(totalCashIn)}</span>
            </div>
            <div class="detail-item">
                <span>迭代次数:</span>
                <span>${iteration}</span>
            </div>
            <div class="detail-item">
                <span><strong>项目可行性:</strong></span>
                <span><strong>${decision}</strong></span>
            </div>
        </div>
        <div class="interpretation ${decisionClass}">
            <i class="fas fa-info-circle"></i> 
            内部收益率为${(irr * 100).toFixed(2)}%。如果您的资本成本（或要求回报率）低于此值，则应接受该项目。IRR越高，项目的投资吸引力越大。
        </div>
    `;

    showResult('irr-result', result);
}

// 盈利指数计算
function calculatePI() {
    const initial = parseFloat(document.getElementById('pi-initial').value);
    const rate = parseFloat(document.getElementById('pi-rate').value) / 100;
    const cashflowsStr = document.getElementById('pi-cashflows').value;

    if (isNaN(initial) || isNaN(rate) || !cashflowsStr) {
        alert('请输入所有必需的值！');
        return;
    }

    const cashflows = parseCashFlows(cashflowsStr);
    
    if (cashflows.length === 0) {
        alert('请输入有效的现金流！');
        return;
    }

    // 计算未来现金流的现值
    let pvCashflows = 0;
    cashflows.forEach((cf, index) => {
        const t = index + 1;
        pvCashflows += cf / Math.pow(1 + rate, t);
    });

    const pi = pvCashflows / initial;
    const npv = pvCashflows - initial;
    
    const decision = pi > 1 ? '接受' : pi < 1 ? '拒绝' : '中性';
    const decisionClass = pi > 1 ? 'positive' : pi < 1 ? 'negative' : 'neutral';

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${pi.toFixed(4)}</div>
        <div class="details">
            <div class="detail-item">
                <span>初始投资:</span>
                <span>${formatCurrency(initial)}</span>
            </div>
            <div class="detail-item">
                <span>未来现金流现值:</span>
                <span>${formatCurrency(pvCashflows)}</span>
            </div>
            <div class="detail-item">
                <span>折现率:</span>
                <span>${(rate * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>NPV:</span>
                <span>${formatCurrency(npv)}</span>
            </div>
            <div class="detail-item">
                <span><strong>投资决策:</strong></span>
                <span><strong>${decision}</strong></span>
            </div>
        </div>
        <div class="interpretation ${decisionClass}">
            <i class="fas fa-info-circle"></i> 
            ${pi > 1 ? 
                `盈利指数为${pi.toFixed(4)}，大于1，表示每投资1元可获得${pi.toFixed(2)}元的现值回报，建议接受该项目。` :
                pi < 1 ?
                `盈利指数为${pi.toFixed(4)}，小于1，表示投资回报不足，建议拒绝该项目。` :
                `盈利指数等于1，项目刚好达到盈亏平衡。`
            }
        </div>
    `;

    showResult('pi-result', result);
}

// ========== 资本成本计算 ==========

// WACC计算
function calculateWACC() {
    const equity = parseFloat(document.getElementById('wacc-equity').value);
    const debt = parseFloat(document.getElementById('wacc-debt').value);
    const re = parseFloat(document.getElementById('wacc-re').value) / 100;
    const rd = parseFloat(document.getElementById('wacc-rd').value) / 100;
    const tax = parseFloat(document.getElementById('wacc-tax').value) / 100;

    if (isNaN(equity) || isNaN(debt) || isNaN(re) || isNaN(rd) || isNaN(tax)) {
        alert('请输入所有必需的值！');
        return;
    }

    const totalValue = equity + debt;
    const equityWeight = equity / totalValue;
    const debtWeight = debt / totalValue;
    
    const wacc = (equityWeight * re) + (debtWeight * rd * (1 - tax));

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${(wacc * 100).toFixed(2)}%</div>
        <div class="details">
            <div class="detail-item">
                <span>企业总价值:</span>
                <span>${formatCurrency(totalValue)}</span>
            </div>
            <div class="detail-item">
                <span>股权权重:</span>
                <span>${(equityWeight * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>债务权重:</span>
                <span>${(debtWeight * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>股权成本:</span>
                <span>${(re * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>债务成本:</span>
                <span>${(rd * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>税后债务成本:</span>
                <span>${(rd * (1 - tax) * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>企业税率:</span>
                <span>${(tax * 100).toFixed(2)}%</span>
            </div>
        </div>
        <div class="interpretation positive">
            <i class="fas fa-info-circle"></i> 
            加权平均资本成本(WACC)为${(wacc * 100).toFixed(2)}%，这是企业进行投资决策时应使用的最低收益率。只有当项目的预期回报率高于WACC时，才应考虑投资。
        </div>
    `;

    showResult('wacc-result', result);
}

// CAPM计算
function calculateCAPM() {
    const rf = parseFloat(document.getElementById('capm-rf').value) / 100;
    const rm = parseFloat(document.getElementById('capm-rm').value) / 100;
    const beta = parseFloat(document.getElementById('capm-beta').value);

    if (isNaN(rf) || isNaN(rm) || isNaN(beta)) {
        alert('请输入所有必需的值！');
        return;
    }

    const marketPremium = rm - rf;
    const re = rf + beta * marketPremium;

    let riskLevel = '';
    let riskClass = '';
    if (beta > 1) {
        riskLevel = '高风险资产 (进取型)';
        riskClass = 'negative';
    } else if (beta < 1 && beta > 0) {
        riskLevel = '低风险资产 (防御型)';
        riskClass = 'positive';
    } else if (beta === 1) {
        riskLevel = '市场平均风险';
        riskClass = 'neutral';
    } else {
        riskLevel = '负相关资产';
        riskClass = 'neutral';
    }

    const result = `
        <h4><i class="fas fa-check-circle"></i> 计算结果</h4>
        <div class="value">${(re * 100).toFixed(2)}%</div>
        <div class="details">
            <div class="detail-item">
                <span>无风险利率:</span>
                <span>${(rf * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>市场回报率:</span>
                <span>${(rm * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>市场风险溢价:</span>
                <span>${(marketPremium * 100).toFixed(2)}%</span>
            </div>
            <div class="detail-item">
                <span>Beta系数:</span>
                <span>${beta.toFixed(2)}</span>
            </div>
            <div class="detail-item">
                <span><strong>风险等级:</strong></span>
                <span><strong>${riskLevel}</strong></span>
            </div>
        </div>
        <div class="interpretation ${riskClass}">
            <i class="fas fa-info-circle"></i> 
            根据CAPM模型，该资产的预期回报率为${(re * 100).toFixed(2)}%。
            ${beta > 1 ? 
                `Beta值(${beta.toFixed(2)})大于1，表示该资产的波动性高于市场平均水平，属于进取型投资。` :
                beta < 1 && beta > 0 ?
                `Beta值(${beta.toFixed(2)})小于1，表示该资产的波动性低于市场平均水平，属于防御型投资。` :
                beta === 1 ?
                `Beta值等于1，表示该资产与市场同步波动。` :
                `Beta值为负，表示该资产与市场负相关，可用于对冲风险。`
            }
        </div>
    `;

    showResult('capm-result', result);
}
