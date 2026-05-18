import React from 'react';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const b2bLeads = await prisma.contactB2B.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const experienceReservations = await prisma.experienceReservation.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const personalizationRequests = await prisma.personalizationRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <h1 style={styles.title}>Panel de Administración</h1>
        <p style={styles.subtitle}>Gestión de Leads (B2B), Reservas de Catas y Solicitudes de Personalización.</p>
      </header>
      
      <div style={styles.dashboard}>
        {/* B2B Table */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Solicitudes B2B Profesionales</h2>
          {b2bLeads.length === 0 ? (
            <p style={styles.empty}>No hay leads B2B todavía.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Empresa</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Mensaje</th>
                  <th style={styles.th}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {b2bLeads.map(lead => (
                  <tr key={lead.id} style={styles.tr}>
                    <td style={styles.td}>{lead.company}</td>
                    <td style={styles.td}>{lead.email}</td>
                    <td style={styles.td}>{lead.message}</td>
                    <td style={styles.td}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Reservas Table */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Reservas "Visita Origen" (Catas)</h2>
          {experienceReservations.length === 0 ? (
            <p style={styles.empty}>No hay reservas de catas todavía.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Asistentes</th>
                  <th style={styles.th}>Fecha Deseada</th>
                  <th style={styles.th}>Fecha Reserva</th>
                </tr>
              </thead>
              <tbody>
                {experienceReservations.map(res => (
                  <tr key={res.id} style={styles.tr}>
                    <td style={styles.td}>{res.name}</td>
                    <td style={styles.td}>{res.email}</td>
                    <td style={styles.td}>{res.guests}</td>
                    <td style={styles.td}>{res.date}</td>
                    <td style={styles.td}>{new Date(res.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Personalization Table */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Solicitudes de Personalización</h2>
          {personalizationRequests.length === 0 ? (
            <p style={styles.empty}>No hay solicitudes de personalización todavía.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nombre</th>
                  <th style={styles.th}>Email / Teléfono</th>
                  <th style={styles.th}>Empresa</th>
                  <th style={styles.th}>Detalles de la Idea</th>
                  <th style={styles.th}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {personalizationRequests.map(req => (
                  <tr key={req.id} style={styles.tr}>
                    <td style={styles.td}>{req.name}</td>
                    <td style={styles.td}>{req.email}<br/><span style={{fontSize: '0.8em', color: '#666'}}>{req.phone || '-'}</span></td>
                    <td style={styles.td}>{req.company || '-'}</td>
                    <td style={styles.td}>{req.details}</td>
                    <td style={styles.td}>{new Date(req.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    backgroundColor: '#fafafa',
    color: '#000',
    minHeight: '100vh',
    padding: '120px 40px',
    fontFamily: 'var(--font-main)',
  },
  header: {
    marginBottom: '60px',
    borderBottom: '2px solid #000',
    paddingBottom: '20px',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: '3rem',
    fontWeight: 400,
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.2rem',
  },
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
  },
  section: {
    backgroundColor: '#fff',
    padding: '40px',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '2rem',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '16px',
    borderBottom: '2px solid #000',
    fontWeight: 600,
  },
  tr: {
    borderBottom: '1px solid #eaeaea',
  },
  td: {
    padding: '16px',
    color: '#333',
  },
  empty: {
    color: '#999',
    fontStyle: 'italic',
  }
};
