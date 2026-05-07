import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../../constants';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { resolveImageUrl } from '../../utils/config';

const Blog = () => {
  const { config, loading } = useConfig();

  if (loading || !config) return null;

  const section = config.sections.blog;
  const posts = section.items || BLOG_POSTS;

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h5 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-primary"></span> {section.tagline}
          </h5>
          <h2 className="section-title mb-4 font-black lg:text-6xl">
            {section.title.split('Blog.')[0]} <span className="text-primary">Blog.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed font-bold">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => (
            <motion.div
              key={post.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 group hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden m-4 rounded-[2rem]">
                <img
                  src={resolveImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg uppercase tracking-[0.2em]">
                  {post.date}
                </div>
              </div>
              <div className="px-8 pb-10 pt-4">
                <div className="flex items-center gap-2 text-primary text-[10px] mb-4 font-black uppercase tracking-[0.2em]">
                   {post.category}
                </div>
                <h3 className="text-xl font-display font-black text-dark-navy mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed font-medium line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-dark-navy font-black uppercase tracking-widest text-xs group/btn cursor-pointer">
                  Read Article <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all"><ArrowRight size={14} /></div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
