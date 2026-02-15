'use client';

import { PageHeader } from '@/components/layout/page-header';
import { motion } from 'framer-motion';

export function PageHeaderAnimated({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <PageHeader title={title} subtitle={subtitle} />
    </motion.div>
  );
}
