// ========================================
// API HELPER - Kavana Bimbingan Online
// ========================================

const API_BASE_URL = 'https://asia-southeast2-renzip-478811.cloudfunctions.net/kavana';

// ========================================
// TOKEN MANAGEMENT
// ========================================

export function getToken() {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('authToken');
}

export function setToken(token) {
    sessionStorage.setItem('authToken', token);
}

export function clearToken() {
    sessionStorage.removeItem('authToken');
}

export function isLoggedIn() {
    return !!getToken();
}

// ========================================
// BASE API REQUEST
// ========================================

export async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    // Remove Content-Type for FormData (let browser set it)
    if (options.body instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            console.error(`API Error (${endpoint}):`, data);
            return { ok: false, error: data.message || 'Request failed', status: response.status };
        }

        return { ok: true, data };
    } catch (err) {
        console.error(`API Error (${endpoint}):`, err);
        return { ok: false, error: err.message || 'Network error' };
    }
}

// ========================================
// AUTH API
// ========================================

export const authAPI = {
    login: async (email, password) => {
        const result = await apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (result.ok && result.data.token) {
            setToken(result.data.token);
            sessionStorage.setItem('userRole', result.data.role);
            sessionStorage.setItem('userId', result.data.user_id);
        }

        return result;
    },

    register: async (data) => {
        return apiRequest('/api/auth/register/mahasiswa', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getProfile: () => apiRequest('/api/auth/profile'),

    updateProfile: (data) =>
        apiRequest('/api/auth/profile', {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    changePassword: (oldPassword, newPassword) =>
        apiRequest('/api/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
        }),

    logout: () => {
        clearToken();
        sessionStorage.clear();
    },

    requestOTP: (email, type = 'reset_password') =>
        apiRequest('/api/auth/request-otp', {
            method: 'POST',
            body: JSON.stringify({ email, type }),
        }),

    verifyOTP: (email, otp, type = 'reset_password') =>
        apiRequest('/api/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp, type }),
        }),

    resetPassword: (reset_token, new_password) =>
        apiRequest('/api/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ reset_token, new_password }),
        }),

    requestRegisterOTP: (data) =>
        apiRequest('/api/auth/request-register-otp', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    verifyRegisterOTP: (email, otp) =>
        apiRequest('/api/auth/verify-register-otp', {
            method: 'POST',
            body: JSON.stringify({ email, otp }),
        }),
};

// ========================================
// MAHASISWA API
// ========================================

export const mahasiswaAPI = {
    getProfile: () => apiRequest('/api/mahasiswa/profile'),

    setTrack: (track, partnerNpm = null) =>
        apiRequest('/api/mahasiswa/track', {
            method: 'PATCH',
            body: JSON.stringify({ track, partner_npm: partnerNpm }),
        }),

    getProposalStatus: () => apiRequest('/api/mahasiswa/profile'),

    submitProposal: (data) =>
        apiRequest('/api/mahasiswa/proposal', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getMyBimbingan: () => apiRequest('/api/mahasiswa/bimbingan'),

    createBimbingan: (data) =>
        apiRequest('/api/mahasiswa/bimbingan', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    submitLaporan: (data) =>
        apiRequest('/api/mahasiswa/laporan', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    createKelompok: (nama) =>
        apiRequest('/api/mahasiswa/kelompok', {
            method: 'POST',
            body: JSON.stringify({ nama }),
        }),

    joinKelompok: (kelompok_id) =>
        apiRequest('/api/mahasiswa/kelompok/join', {
            method: 'POST',
            body: JSON.stringify({ kelompok_id }),
        }),

    getMyKelompok: () => apiRequest('/api/mahasiswa/kelompok'),
    getAvailableKelompok: () => apiRequest('/api/mahasiswa/kelompok/available'),
    getPeriodeAktif: () => apiRequest('/api/mahasiswa/periode-aktif'),
    getDosenList: () => apiRequest('/api/mahasiswa/dosen/list'),
    getMyLaporan: () => apiRequest('/api/mahasiswa/laporan'),
    getMySidang: () => apiRequest('/api/mahasiswa/sidang'),
};

// ========================================
// DOSEN API
// ========================================

export const dosenAPI = {
    getProfile: () => apiRequest('/api/dosen/profile'),
    getStats: () => apiRequest('/api/dosen/stats'),
    getMahasiswaBimbingan: () => apiRequest('/api/dosen/mahasiswa'),
    getBimbinganList: () => apiRequest('/api/dosen/bimbingan'),

    approveBimbingan: (id, status, catatan) =>
        apiRequest(`/api/dosen/bimbingan/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, catatan }),
        }),

    getLaporanList: () => apiRequest('/api/dosen/laporan'),

    approveLaporan: (mahasiswaId, status) =>
        apiRequest(`/api/dosen/laporan/${mahasiswaId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        }),
};

// ========================================
// KOORDINATOR API
// ========================================

export const koordinatorAPI = {
    getProfile: () => apiRequest('/api/koordinator/profile'),
    getStats: () => apiRequest('/api/koordinator/stats'),
    getPendingProposals: () => apiRequest('/api/koordinator/proposal/pending'),

    validateProposal: (mahasiswaId, status, catatan) =>
        apiRequest('/api/koordinator/proposal/validate', {
            method: 'PATCH',
            body: JSON.stringify({ mahasiswa_id: mahasiswaId, status, catatan }),
        }),

    getMahasiswaList: () => apiRequest('/api/koordinator/mahasiswa'),
    getDosenList: () => apiRequest('/api/koordinator/dosen'),

    assignDosen: (mahasiswaId, dosenId, dosenId2) =>
        apiRequest('/api/koordinator/assign-dosen', {
            method: 'POST',
            body: JSON.stringify({
                mahasiswa_id: mahasiswaId,
                dosen_id: dosenId,
                dosen_id_2: dosenId2 || null,
            }),
        }),

    scheduleSidang: (data) =>
        apiRequest('/api/koordinator/sidang/schedule', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getJadwalList: () => apiRequest('/api/koordinator/jadwal'),
    getJadwalActive: () => apiRequest('/api/koordinator/jadwal/active'),

    createJadwal: (data) =>
        apiRequest('/api/koordinator/jadwal', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateJadwal: (id, data) =>
        apiRequest(`/api/koordinator/jadwal/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    completeJadwal: (id) =>
        apiRequest(`/api/koordinator/jadwal/${id}/complete`, {
            method: 'POST',
        }),

    getMySemester: () => apiRequest('/api/koordinator/my-semester'),
    getAllMahasiswa: () => apiRequest('/api/koordinator/mahasiswa'),
    getAllSidang: () => apiRequest('/api/koordinator/sidang'),
    getPengujiList: () => apiRequest('/api/koordinator/penguji'),
};

// ========================================
// KAPRODI API
// ========================================

export const kaprodiAPI = {
    getProfile: () => apiRequest('/api/kaprodi/profile'),
    getStats: () => apiRequest('/api/kaprodi/stats'),
    getRecentActivities: () => apiRequest('/api/kaprodi/activities'),
    getMahasiswaList: () => apiRequest('/api/kaprodi/mahasiswa'),
    getDosenList: () => apiRequest('/api/kaprodi/dosen'),
    getKoordinatorList: () => apiRequest('/api/kaprodi/koordinator'),

    assignKoordinatorSemester: (koordinator_id, semester) =>
        apiRequest('/api/kaprodi/koordinator/assign-semester', {
            method: 'POST',
            body: JSON.stringify({ koordinator_id, semester }),
        }),

    unassignKoordinatorSemester: (koordinator_id) =>
        apiRequest('/api/kaprodi/koordinator/unassign-semester', {
            method: 'POST',
            body: JSON.stringify({ koordinator_id }),
        }),
};

// ========================================
// ADMIN API
// ========================================

export const adminAPI = {
    getProfile: () => apiRequest('/api/admin/profile'),
    getStats: () => apiRequest('/api/admin/stats'),
    getRecentActivity: () => apiRequest('/api/admin/activity'),
    getAllUsers: () => apiRequest('/api/admin/users'),

    updateUserStatus: (userId, role, isActive) =>
        apiRequest(`/api/admin/users/${userId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ role, is_active: isActive }),
        }),

    deleteUser: (userId, role) =>
        apiRequest(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            body: JSON.stringify({ role }),
        }),

    getAllDosen: () => apiRequest('/api/admin/dosen'),

    createDosen: (data) =>
        apiRequest('/api/admin/dosen', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getAllMahasiswa: () => apiRequest('/api/admin/mahasiswa'),
    getSystemReport: () => apiRequest('/api/admin/report'),
};

// ========================================
// UPLOAD API
// ========================================

export const uploadAPI = {
    uploadProfile: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const token = getToken();
        const response = await fetch(`${API_BASE_URL}/api/profile/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json();
        return { ok: response.ok, data };
    },
};
