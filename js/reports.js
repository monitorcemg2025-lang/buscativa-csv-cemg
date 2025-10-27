async function getSchedules() {
    try {
        return JSON.parse(localStorage.getItem('schedules')) || [];
    } catch (error) {
        console.error('Erro ao obter horários:', error);
        return [];
    }
}

async function getAbsences() {
    try {
        return JSON.parse(localStorage.getItem('absences')) || [];
    } catch (error) {
        console.error('Erro ao obter faltas:', error);
        return [];
    }
}

function filterData(data, type, key = 'date') {
    try {
        const now = new Date();
        let filtered = data;
        if (type === 'daily') {
            const today = now.toISOString().split('T')[0];
            filtered = data.filter(item => item[key] === today);
        } else if (type === 'weekly') {
            const oneWeekAgo = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];
            filtered = data.filter(item => item[key] >= oneWeekAgo);
        } else if (type === 'monthly') {
            const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1)).toISOString().split('T')[0];
            filtered = data.filter(item => item[key] >= oneMonthAgo);
        }
        return filtered;
    } catch (error) {
        console.error('Erro ao filtrar dados:', error);
        return [];
    }
}

async function generateAbsencesPDF(type) {
    try {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('jsPDF não carregado corretamente.');
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('Centro de Excelência Miguel das Graças', 10, 10);
        doc.setFontSize(14);
        doc.text(`Relatório de Faltas ${type.charAt(0).toUpperCase() + type.slice(1)}`, 10, 20);
        
        const absences = await getAbsences();
        const filteredAbsences = filterData(absences, type);
        if (filteredAbsences.length === 0) {
            doc.setFontSize(12);
            doc.text('Nenhuma falta registrada.', 10, 30);
        } else {
            doc.autoTable({
                head: [['Aluno', 'Série', 'Data', 'Motivo']],
                body: filteredAbsences.map(item => [item.name, item.grade, item.date, item.reason]),
                startY: 30,
                styles: { fontSize: 10, cellPadding: 2 },
                headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [240, 240, 240] }
            });
        }
        
        doc.save(`faltas_${type}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error('Erro ao gerar PDF de faltas:', error);
        alert('Erro ao gerar o PDF de faltas. Verifique o console para detalhes.');
    }
}

async function generateSchedulesPDF(type) {
    try {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error('jsPDF não carregado corretamente.');
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('Centro de Excelência Miguel das Graças', 10, 10);
        doc.setFontSize(14);
        doc.text(`Relatório de Horários ${type.charAt(0).toUpperCase() + type.slice(1)}`, 10, 20);
        
        const schedules = await getSchedules();
        const filteredSchedules = filterData(schedules, type);
        if (filteredSchedules.length === 0) {
            doc.setFontSize(12);
            doc.text('Nenhum horário registrado.', 10, 30);
        } else {
            doc.autoTable({
                head: [['Nome do Monitor', 'Data', 'Entrada', 'Saída']],
                body: filteredSchedules.map(item => [item.monitorName, item.date, item.entry, item.exit]),
                startY: 30,
                styles: { fontSize: 10, cellPadding: 2 },
                headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
                alternateRowStyles: { fillColor: [240, 240, 240] }
            });
        }
        
        doc.save(`horarios_${type}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
        console.error('Erro ao gerar PDF de horários:', error);
        alert('Erro ao gerar o PDF de horários. Verifique o console para detalhes.');
    }
