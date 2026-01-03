import { motion } from 'framer-motion';
import { FaStar, FaMeteor, FaGlobe, FaCloud, FaProjectDiagram } from 'react-icons/fa';

const TEMPLATES = [
  { id: 'stars', name: 'Stars', icon: FaStar, color: '#f272c8' },
  { id: 'meteors', name: 'Meteors', icon: FaMeteor, color: '#ffffff' },
  { id: 'galaxy', name: 'Galaxy', icon: FaGlobe, color: '#915EFF' },
  { id: 'nebula', name: 'Nebula', icon: FaCloud, color: '#bf61ff' },
  { id: 'constellation', name: 'Constellation', icon: FaProjectDiagram, color: '#ffffff' },
];

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-white text-sm font-semibold">Particle Template</h3>
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <motion.button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-[#915EFF] bg-[#915EFF]/20'
                  : 'border-white/10 bg-black-100/30 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${template.name} template`}
            >
              <Icon
                className={`mx-auto text-xl ${
                  isSelected ? 'text-[#915EFF]' : 'text-white/70'
                }`}
              />
              <span
                className={`block mt-1 text-xs ${
                  isSelected ? 'text-[#915EFF]' : 'text-white/60'
                }`}
              >
                {template.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

