/**
 * QUANTUM CORE V3.0 - AUDITOR MODULE
 * Matrix Integrity Analysis, Context Density, Strategic Dashboard
 */

const MatrixAuditor = {
    // Slot-Kategorien für semantische Analyse
    slotCategories: {
        1: { name: 'Identität', keywords: ['ich bin', 'name', 'commander', 'profil'] },
        2: { name: 'Design DNA', keywords: ['design', 'ui', 'glassmorphism', 'vitreous'] },
        3: { name: 'Projekt-Fokus', keywords: ['projekt', 'ziel', 'mission', 'vision'] },
        4: { name: 'Workflow', keywords: ['workflow', 'prozess', 'ablauf'] },
        5: { name: 'Code Standards', keywords: ['function', 'const', 'api', 'code'] },
        6: { name: 'API/Services', keywords: ['api', 'endpoint', 'service'] },
        7: { name: 'Timeline', keywords: ['termin', 'deadline', 'meilenstein'] },
        8: { name: 'Notes', keywords: ['notiz', 'memo', 'wichtig'] },
        9: { name: 'Resources', keywords: ['resource', 'tool', 'library'] },
        10: { name: 'Ideas', keywords: ['idee', 'brainstorm', 'konzept'] },
        11: { name: 'Archive', keywords: ['archiv', 'backup', 'history'] }
    },

    generateReport(pinnedMatrix) {
        const activeSlots = pinnedMatrix.filter(slot => slot !== null).length;
        const totalSlots = pinnedMatrix.length;
        const fillRate = Math.round((activeSlots / totalSlots) * 100);

        // Analyse der kritischen Slots
        const hasIdentity = pinnedMatrix[0] !== null;
        const hasCode = pinnedMatrix.some(s => s && /function|const|api|code/i.test(s));
        const hasProject = pinnedMatrix.some(s => s && /ziel|projekt|mission|fokus/i.test(s));
        const hasDesign = pinnedMatrix.some(s => s && /design|ui|glass|vitreous/i.test(s));

        // Slot-Details sammeln
        const slotDetails = pinnedMatrix.map((content, i) => ({
            slot: i + 1,
            name: this.slotCategories[i + 1]?.name || `Slot ${i + 1}`,
            active: content !== null,
            preview: content ? content.substring(0, 50) + '...' : null,
            charCount: content ? content.length : 0
        }));

        // Gesamtzeichen berechnen
        const totalChars = pinnedMatrix.reduce((sum, s) => sum + (s?.length || 0), 0);

        // Health-Status bestimmen
        let health, healthColor;
        if (fillRate >= 70) {
            health = 'OPTIMAL';
            healthColor = 'text-green-400';
        } else if (fillRate >= 40) {
            health = 'STABLE';
            healthColor = 'text-yellow-400';
        } else {
            health = 'WEAK';
            healthColor = 'text-red-400';
        }

        return {
            fillRate,
            activeSlots,
            totalSlots,
            totalChars,
            health,
            healthColor,
            slotDetails,
            missing: {
                identity: !hasIdentity,
                code: !hasCode,
                project: !hasProject,
                design: !hasDesign
            },
            recommendations: this.generateRecommendations({ hasIdentity, hasCode, hasProject, hasDesign, fillRate })
        };
    },

    generateRecommendations(analysis) {
        const recs = [];

        if (analysis.missing?.identity || !analysis.hasIdentity) {
            recs.push({ level: 'critical', text: 'Slot 1 (Identität) fehlt - KI kennt dich nicht!' });
        }
        if (analysis.missing?.project || !analysis.hasProject) {
            recs.push({ level: 'warning', text: 'Kein Projekt-Fokus definiert - Antworten könnten unspezifisch sein' });
        }
        if (analysis.missing?.code || !analysis.hasCode) {
            recs.push({ level: 'info', text: 'Keine Code-Standards geladen - Nutze /pin 5 für Coding-Regeln' });
        }
        if (analysis.fillRate < 30) {
            recs.push({ level: 'warning', text: 'Geringe Kontext-Dichte - Mehr Slots befüllen für bessere Antworten' });
        }
        if (analysis.fillRate >= 80) {
            recs.push({ level: 'success', text: 'Exzellente Kontext-Dichte - System ist voll einsatzbereit!' });
        }

        return recs;
    },

    formatStatusHTML(report) {
        const recHTML = report.recommendations.map(r => {
            const icons = { critical: '🚨', warning: '⚠️', info: 'ℹ️', success: '✅' };
            const colors = { critical: 'text-red-400', warning: 'text-yellow-400', info: 'text-cyan-400', success: 'text-green-400' };
            return `<p class="${colors[r.level]}">${icons[r.level]} ${r.text}</p>`;
        }).join('');

        const slotBars = report.slotDetails.map(s =>
            `<div class="flex items-center gap-2 text-[9px]">
                <span class="w-4 opacity-50">${s.slot}</span>
                <div class="flex-1 h-1 bg-white/10 rounded overflow-hidden">
                    <div class="h-full ${s.active ? 'bg-cyan-400' : 'bg-transparent'}" style="width: ${s.active ? '100%' : '0%'}"></div>
                </div>
                <span class="opacity-50 w-16 truncate">${s.active ? s.name : '—'}</span>
            </div>`
        ).join('');

        return `
            <div class="p-4 glass-modern rounded-2xl border border-cyan-500/30 mt-2">
                <h3 class="text-cyan-400 font-bold mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                    <span>⬡</span> Matrix-Status-Report
                </h3>
                <div class="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                        <p class="opacity-50 text-[8px] uppercase">Kontext-Dichte</p>
                        <p class="text-xl font-mono font-bold">${report.fillRate}%</p>
                    </div>
                    <div>
                        <p class="opacity-50 text-[8px] uppercase">Status</p>
                        <p class="text-xl font-mono font-bold ${report.healthColor}">${report.health}</p>
                    </div>
                    <div>
                        <p class="opacity-50 text-[8px] uppercase">Zeichen</p>
                        <p class="text-xl font-mono font-bold">${report.totalChars.toLocaleString()}</p>
                    </div>
                </div>
                <div class="mb-4 space-y-1">
                    ${slotBars}
                </div>
                <div class="pt-3 border-t border-white/10 space-y-1">
                    <p class="opacity-50 uppercase tracking-tighter text-[8px] mb-2">Empfehlungen:</p>
                    ${recHTML || '<p class="text-green-400">✅ Alle Systeme optimal konfiguriert</p>'}
                </div>
            </div>
        `;
    }
};

// Export for global access
window.MatrixAuditor = MatrixAuditor;
